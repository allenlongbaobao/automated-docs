# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/create-a-new-reply/fixture/'

request-create-a-new-reply = utils.load-fixture FIXTURE_PATH + 'request-create-a-new-reply'

describe 'integrated test -- create-a-new-reply', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/create-a-new-reply', ['users', 'interesting-points', 'interesting-point-sessions', 'messages', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '创建回复过程中', !->
    can '请求的报文出错，能够给回出错信息', !(done)->
      (client, response-data) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-reply', {}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    can '用户未登录时，能够给回未登录消息', !(done)->
      (client, response-data) <-! socket-helper.get-client {logged-in: false}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.should.include-eql {message: '事件create-a-new-reply需要登录才能完成'}
      done!

    can '回复的评论不存在时，能够给回出错提示', !(done)->
      (client) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-reply', (request-create-a-new-reply <<< {r-mid: 'inexistence-comment-id'})
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

  describe '成功创建回复后', !->
    # 在这个测例中，我们设定：
    # 1. wangyu是回复的创建者
    # 2. 回复的评论创建者是weike
    # 3. 回复所在的会话创建者是baixin
    # 4. 回复所在的兴趣点创建者是xiaodong
    # 5. weike在回复中@到了baixin
    # 6. jiahua正在浏览会话
    # 7. xiaodong关注了会话
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
    wangyu-info = {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
    weike-info = {uid: 'uid-4', logged-in: true, urls: ['http://www.some.com']}
    jiahua-info = {uid: 'uid-5', logged-in: true, urls: ['http://www.some.com']}
    xiaodong = baixin = wangyu = weike = jiahua = null

    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client xiaodong-info
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (wangyu-channel, response-data) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info
      (jiahua-channel) <-! socket-helper.get-client jiahua-info

      xiaodong := xiaodong-channel
      baixin := baixin-channel
      wangyu := wangyu-channel
      weike := weike-channel
      jiahua := jiahua-channel

      request-create-a-new-reply.ipid = 'ipid-1'
      request-create-a-new-reply.ipsid = 'ipsid-2'
      request-create-a-new-reply.r-mid = 'mid-1'
      request-create-a-new-reply.text-content = "@baixin 好吧"
      request-create-a-new-reply.is-anonymous = false
      done!

    can '创建者能够收到创建后的回复数据', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'createdReply'
      data.result.should.eql 'success'
      data.created-reply.should.have.property 'url'
      data.created-reply.should.have.property 'sessionIndex'
      data.created-reply.should.have.property 'commentIndex'
      data.created-reply.should.have.property 'replyIndex'
      data.errors.length.should.eql 0
      done!

    can '创建能出现在兴趣点的参与用户列表中', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      (data) <-! wangyu.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      data.should.have.property 'result', 'success'
      data.should.have.property 'interestingPoints' .with.length 1
      data.interesting-points.0.should.have.property 'participant'
      [.._id for data.interesting-points.0.participant].should.include wangyu-info.uid
      done!

    can '匿名回复时，创建者的信息能够被隐藏，并且不会出现在兴趣点的参与用户中', !(done)->
      request-create-a-new-reply.is-anonymous = true
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'createdReply'
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      data.created-reply.should.have.property 'sendBy'
      data.created-reply.should.have.property '_id'
      data.created-reply.send-by._id.should.not.eql wangyu.uid
      (data) <-! wangyu.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      data.should.have.property 'result', 'success'
      data.should.have.property 'interestingPoints' .with.length 1
      data.interesting-points.0.should.have.property 'participant'
      [.._id for data.interesting-points.0.participant].should.not.include wangyu-info.uid
      done!

    can '正在浏览回复所在评论的用户能够接收到消息通知', !(done)->
      created-reply = null
      jiahua.interesting-points-channel.on 'push-reply-updated-in-opening-comment', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedReply'
        data.type.should.eql 'added'
        data.added-reply.should.eql created-reply
        done!
      (data) <-! jiahua.interesting-points-channel.emit 'open-comment', {cid: request-create-a-new-reply.r-mid}
      wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply, !(data)->
        created-reply := data.created-reply

    can '回复所在的评论创建者能够接收到消息通知', !(done)->
      created-reply = null
      weike.interesting-points-channel.on 'push-reply-updated-in-created-comment', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedReply'
        data.type.should.eql 'added'
        data.added-reply.should.eql created-reply
        done!
      wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply, !(data)->
        created-reply := data.created-reply

    can '被@到的用户能够接收到消息提示', !(done)->
      created-reply = null
      baixin.interesting-points-channel.on 'push-new-mention-in-reply', !(data)->
        <-! set-timeout _, 100
        data.should.eql created-reply
        done!
      wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply, !(data)->
        created-reply := data.created-reply

    can '创建的回复能够被其他用户查询到', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      created-reply = data.created-reply
      (data) <-! jiahua.interesting-points-channel.emit 'retrieve-replies', {cid: request-create-a-new-reply.r-mid, skip: 0, limit: 10}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'replies'
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      data.replies.should.include-eql (_.omit created-reply, 'url', 'replyIndex', 'commentIndex', 'sessionIndex')
      done!

    can '除非匿名，否则能够在location的参与用户中查询到创建者', !(done)->
      is-anonymous = if Math.random! > 0.5 then true else false
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', ({is-anonymous: is-anonymous} <<< request-create-a-new-reply)
      created-reply = data.created-reply
      (data) <-! xiaodong.locations-channel.emit 'retrieve-attended-users', {lid: 'lid-1'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'users'
      if request-create-a-new-reply.is-anonymous then
        [.._id for data.users].should.not.include-eql wangyu-info.uid
      else
        [.._id for data.users].should.include-eql wangyu-info.uid
      done!

    can '对应的评论的回复数量会增加', !(done)->
      (data) <-! jiahua.interesting-points-channel.emit 'retrieve-comments', {ipsid: request-create-a-new-reply.ipsid, skip: 0, limit: 10}
      comment-before-operate = [.. for data.comments when .._id is request-create-a-new-reply.r-mid][0]
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      (data) <-! jiahua.interesting-points-channel.emit 'retrieve-comments', {ipsid: request-create-a-new-reply.ipsid, skip: 0, limit: 10}
      comment-after-operate = [.. for data.comments when .._id is request-create-a-new-reply.r-mid][0]
      comment-before-operate.replies-count.should.eql (comment-after-operate.replies-count - 1)
      done!

    can '在不匿名的情况下，在同一个location的用户能够收到创建者的推送信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (data) <-! xiaodong.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
      data.should.have.property 'result', 'success'
      xiaodong.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.should.have.property 'user'
        data.location.should.have.property 'id', 'lid-1'
        data.user.should.have.property '_id', wangyu-info.uid
        data.user.should.have.property 'status', 'online'
        waiter1!
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      data.should.have.property 'result', 'success'
      waiter2!
