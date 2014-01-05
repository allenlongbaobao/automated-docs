# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/remove-replies/fixture/'

describe 'integrated test -- remove-replies', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/remove-replies', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回错误信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'remove-replies', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'remove-replies', {rids: ['mid-1']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件remove-replies需要登录才能完成'}
    done!

  can '请求删除的回复不存在时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'remove-replies', {rids: ['inexistence-reply-id']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  # 在这个测例中，我们设定：
  # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
  # 2. 柏信在ipid-1中创建了评论
  # 3. 王瑜回复了柏信创建的评论
  can '操作者不是回复的创建者时，能够给回出错提示', !(done)->
    (xiaodong) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
    (wangyu) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
    request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    request-create-a-new-reply = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
    (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', (request-create-a-new-reply <<< {r-mid: data.created-comment._id})
    (data) <-! xiaodong.interesting-points-channel.emit 'remove-replies', {rids: [data.created-reply._id]}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '成功删除后', !->
    # 在这个测例中，我们设定：
    # 1. 小东创建了兴趣点ipid-2和会话ipsid-2
    # 2. 柏信在ipid-2中创建了评论
    # 3. 王瑜在关注了会话ipsid-2
    # 4. 伟科正在浏览会话ipsid-2
    # 5. 嘉华回复了柏信的评论
    xiaodong-info = {uid: 'uid-1', logged-in: true}
    baixin-info = {uid: 'uid-2', logged-in: true}
    wangyu-info = {uid: 'uid-3', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    jiahua-info = {uid: 'uid-4', logged-in: true}
    xiaodong = baixin = wangyu = weike = jiahua = null

    request-create-a-new-comment = ipid: 'ipid-2', ipsid: 'ipsid-2', type: 'ips-msg', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    request-create-a-new-reply = ipid: 'ipid-2', ipsid: 'ipsid-2', type: 'ip-rpl', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    reply-id = comment-id = null

    before-each !(done)->

      (xiaodong-channel) <-! socket-helper.get-client xiaodong-info
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info
      (jiahua-channel) <-! socket-helper.get-client jiahua-info

      xiaodong := xiaodong-channel
      baixin := baixin-channel
      wangyu := wangyu-channel
      weike := weike-channel
      jiahua := jiahua-channel

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      (data) <-! jiahua.interesting-points-channel.emit 'create-a-new-reply', (request-create-a-new-reply <<< {r-mid: data.created-comment._id})
      reply-id := data.created-reply._id
      comment-id := data.created-reply.r-mid
      done! if data.result is 'success'

    can '能够收到删除成功的返回信息', !(done)->
      (data) <-! jiahua.interesting-points-channel.emit 'remove-replies', {rids: [reply-id]}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '评论的创建者、浏览者能够收到消息推送', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      baixin.interesting-points-channel.on 'push-reply-updated-in-created-comment', !(data)-> waiter1!
      weike.interesting-points-channel.on 'push-reply-updated-in-opening-comment', !(data)-> waiter2!
      <-! weike.interesting-points-channel.emit 'open-comment', {cid: comment-id}
      <-! jiahua.interesting-points-channel.emit 'remove-replies', {rids: [reply-id]}

    can '被删除的回复不会被查询到', !(done)->
      (data) <-! jiahua.interesting-points-channel.emit 'retrieve-replies', {cid: comment-id, skip: 0, limit: 10}
      data.should.have.property 'replies' .with.length 1
      (data) <-! jiahua.interesting-points-channel.emit 'remove-replies', {rids: [reply-id]}
      (data) <-! jiahua.interesting-points-channel.emit 'retrieve-replies', {cid: comment-id, skip: 0, limit: 10}
      data.should.have.property 'replies' .with.length 0
      done!

    can '对应的评论的回复数量会减少', !(done)->
      (data) <-! jiahua.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-2', skip: 0, limit: 10}
      comment-before-operate = [.. for data.comments when .._id is comment-id][0]
      (data) <-! jiahua.interesting-points-channel.emit 'remove-replies', {rids: [reply-id]}
      (data) <-! jiahua.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-2', skip: 0, limit: 10}
      comment-after-operate = [.. for data.comments when .._id is comment-id][0]
      comment-before-operate.replies-count.should.eql (comment-after-operate.replies-count + 1)
      done!
