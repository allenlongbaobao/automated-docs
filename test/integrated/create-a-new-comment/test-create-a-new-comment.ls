# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/create-a-new-comment/fixture/'

request-create-a-new-comment = utils.load-fixture FIXTURE_PATH + 'request-create-a-new-comment'

describe 'integrated test -- create-a-new-comment', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/create-a-new-comment', ['users', 'interesting-points', 'interesting-point-sessions', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '评论创建过程中', !->
    can '请求的报文出错时，能够给出错误信息', !(done)->
      (client, response-data) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: []}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-comment', {}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    can '用户未登录时，能够给回未登录提示', !(done)->
      (client, response-data) <-! socket-helper.get-client {logged-in: false}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.should.include-eql {message: '事件create-a-new-comment需要登录才能完成'}
      done!

    can '会话不存在时，能够返回出错信息', !(done)->
      (client, response-data) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-comment', (request-create-a-new-comment <<< {ipsid: 'inexistence-session-id'})
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

  describe '成功创建评论后', !->
    # 在这个测例中，我们设定：
    # 1. weike创建了这个评论
    # 2. 评论所在的会话创建者是baixin
    # 3. 会话所在的兴趣点创建者是xiaodong
    # 4. weike在评论中@到了xiaodong
    # 5. wangyu此时正在浏览该会话
    # 6. xiaodong关注了会话
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
    wangyu-info = {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
    weike-info = {uid: 'uid-4', logged-in: true, urls: ['http://www.some.com']}
    xiaodong = baixin = wangyu = weike = null

    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client xiaodong-info
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel, response-data) <-! socket-helper.get-client weike-info

      xiaodong := xiaodong-channel
      baixin := baixin-channel
      wangyu := wangyu-channel
      weike := weike-channel

      # 确保创建的评论从属于存在的兴趣点和会话
      request-create-a-new-comment.ipid = 'ipid-1'
      request-create-a-new-comment.ipsid = 'ipsid-2'
      request-create-a-new-comment.is-anonymous = false
      done!

    can '创建者能够获得创建后的评论数据', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'createdComment'
      data.result.should.eql 'success'
      data.created-comment.should.have.property 'url'
      data.created-comment.should.have.property 'sessionIndex'
      data.created-comment.should.have.property 'commentIndex'
      data.errors.length.should.eql 0
      done!

    can '创建者信息会出现在兴趣点的参与用户中', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      (data) <-! weike.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      data.should.have.property 'result', 'success'
      data.should.have.property 'interestingPoints' .with.length 1
      data.interesting-points.0.should.have.property 'participant'
      [.._id for data.interesting-points.0.participant].should.include weike-info.uid
      done!

    can '若是匿名评论，创建者信息会被隐藏，并且不会出现在兴趣点的参与用户中', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', (request-create-a-new-comment <<< {is-anonymous: true})
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'createdComment'
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      data.created-comment.should.have.property 'sendBy'
      data.created-comment.send-by.should.have.property '_id'
      data.created-comment.send-by._id.should.not.eql weike-info.uid
      (data) <-! weike.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      data.should.have.property 'result', 'success'
      data.should.have.property 'interestingPoints' .with.length 1
      data.interesting-points.0.should.have.property 'participant'
      [.._id for data.interesting-points.0.participant].should.not.include weike-info.uid
      done!

    can '正在浏览该兴趣点会话的用户能够收到通知', !(done)->
      created-comment = null
      wangyu.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
        # 保证created-comment已经创建完成
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedComment'
        data.type.should.eql 'added'
        data.added-comment.should.eql created-comment
        done!
      (data) <-! wangyu.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: request-create-a-new-comment.ipid, ipsid: request-create-a-new-comment.ipsid}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      created-comment := data.created-comment

    can '被评论的兴趣点会话创建者能够收到消息通知', !(done)->
      created-comment = null
      baixin.interesting-points-channel.on 'push-comment-updated-in-created-session', !(data)->
        # 保证created-comment已经创建完成
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedComment'
        data.type.should.eql 'added'
        data.added-comment.should.eql created-comment
        done!
      weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment, !(data)->
        created-comment := data.created-comment

    can '关注该兴趣点会话的用户能够收到消息通知', !(done)->
      created-comment = null
      xiaodong.interesting-points-channel.on 'push-comment-updated-in-watching-session', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedComment'
        data.type.should.eql 'added'
        data.added-comment.should.eql created-comment
        done!
      (data) <-! xiaodong.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: [request-create-a-new-comment.ipsid]}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      created-comment := data.created-comment

    can '被@到的用户能够收到消息通知', !(done)->
      created-comment = null
      xiaodong.interesting-points-channel.on 'push-new-mention-in-comment', !(data)->
        # 保证created-comment已经返回
        <-! set-timeout _, 100
        data.should.eql created-comment
        done!
      wangyu.interesting-points-channel.on 'push-new-mention-in-comment', !(data)->
        data.should.fail '没被@到的用户收到了被@消息'
      baixin.interesting-points-channel.on 'push-new-mention-in-comment', !(data)->
        data.should.fail '没被@到的用户收到了被@消息'
      weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment, !(data)->
        created-comment := data.created-comment

    can '用户能够查询到新创建的评论', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      created-comment = data.created-comment
      (data) <-! wangyu.interesting-points-channel.emit 'retrieve-comments', {ipsid: request-create-a-new-comment.ipsid, skip: 0, limit: 10}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'comments'
      data.comments.should.include-eql (_.omit created-comment, 'url', 'sessionIndex', 'commentIndex')
      done!

    can '除非匿名，否则创建者能够在location的参与用户中被查询到', !(done)->
      request-create-a-new-comment <<< {is-anonymous: if Math.random! > 0.5  then true else false}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      data.should.have.property 'result', 'success'
      created-comment = data.created-comment
      (data) <-! xiaodong.locations-channel.emit 'retrieve-attended-users', {lid: 'lid-1'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'users'
      if request-create-a-new-comment.is-anonymous is true then
        [.._id for data.users].should.not.include-eql weike-info.uid
      else
        [.._id for data.users].should.include-eql weike-info.uid
      done!

    can '对应的会话的评论数量会增加', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: request-create-a-new-comment.ipid, skip: 0, limit: 10}
      interesting-point-session-before-operate = [.. for data.interesting-point-sessions when .._id is request-create-a-new-comment.ipsid][0]
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      (data) <-! weike.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: request-create-a-new-comment.ipid, skip: 0, limit: 10}
      interesting-point-session-after-operate = [.. for data.interesting-point-sessions when .._id is request-create-a-new-comment.ipsid][0]
      interesting-point-session-before-operate.comments-count.should.eql (interesting-point-session-after-operate.comments-count - 1)
      done!

    can '在不是匿名的情况下，在同一个location的用户在参与列表可以收到创建者的信息推送', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (data) <-! xiaodong.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
      data.should.have.property 'result', 'success'
      xiaodong.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.should.have.property 'user'
        data.location.should.have.property 'id', 'lid-1'
        data.user.should.have.property '_id', weike-info.uid
        data.user.should.have.property 'status', 'online'
        waiter1!
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      data.should.have.property 'result', 'success'
      waiter2!
