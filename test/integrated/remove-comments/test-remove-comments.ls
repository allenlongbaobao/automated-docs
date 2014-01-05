# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/remove-comments/fixture/'

describe 'integrated test -- remove-comments', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/remove-comments', ['users', 'locations', 'interesting-point-sessions', 'interesting-points'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'remove-comments', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'remove-comments', {cids: ['mid-1', 'mid-2']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件remove-comments需要登录才能完成'}
    done!

  can '请求删除的评论不存在时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'remove-comments', {cids: ['inexistence-comment-id', 'mid-1']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '操作者没有权限删除', !->
    # 在这个测例中，我们设定:
    # 小东创建了兴趣点ipid-1和会话ipsid-1
    # 柏信在ipisd-1中创建了评论mid-1
    # 王瑜回复了评论mid-1
    baixin-info = {uid: 'uid-2', logged-in: true}
    wangyu-info = {uid: 'uid-3', logged-in: true}
    baixin = wangyu = null

    request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    request-create-a-new-reply = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false

    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (wangyu-channel) <-! socket-helper.get-client wangyu-info

      baixin := baixin-channel
      wangyu := wangyu-channel

      done!

    can '不是评论创建者时，能够给回错误信息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      (data) <-! wangyu.interesting-points-channel.emit 'remove-comments', {cids: [data.created-comment._id]}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.length.should.above 0
      done!

    can '评论已被人回复时，能够给回错误信息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      (data) <-! wangyu.interesting-points-channel.emit 'create-a-new-reply', (request-create-a-new-reply <<< {r-mid: data.created-comment._id})
      (data) <-! baixin.interesting-points-channel.emit 'remove-comments', {cids: [data.created-reply.r-mid]}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.length.should.above 0
      done!

  describe '成功删除后', !->
    # 在这个测例中，我们设定:
    # 小东创建了兴趣点ipid-2和会话ipsid-2
    # 柏信关注了会话ipsid-2
    # 王瑜正在浏览兴趣点ipid-2和会话ipsid-2
    # 伟科在会话ipsid-2中创建了评论
    xiaodong-info = {uid: 'uid-1', logged-in: true}
    baixin-info = {uid: 'uid-2', logged-in: true}
    wangyu-info = {uid: 'uid-3', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    xiaodong = baixin = wangyu = weike = null

    request-create-a-new-comment = ipid: 'ipid-2', ipsid: 'ipsid-2', type: 'ips-msg', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    comment-id = null

    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client xiaodong-info
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info

      xiaodong := xiaodong-channel
      baixin := baixin-channel
      wangyu := wangyu-channel
      weike := weike-channel

      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      comment-id := data.created-comment._id
      done! if data.result is 'success'

    can '能够返回操作成功信息', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'remove-comments', {cids: [comment-id]}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '评论所在的会话创建者、订阅者、浏览者能够收到消息推送', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!
      xiaodong.interesting-points-channel.on 'push-comment-updated-in-created-session', !(data)->
        data.should.have.property 'type', 'removed'
        data.should.have.property 'removedComment'
        waiter1!
      baixin.interesting-points-channel.on 'push-comment-updated-in-watching-session', !(data)->
        data.should.have.property 'type', 'removed'
        data.should.have.property 'removedComment'
        waiter2!
      wangyu.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
        data.should.have.property 'type', 'removed'
        data.should.have.property 'removedComment'
        waiter3!
      (data) <-! baixin.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-2']}
      data.should.have.property 'result', 'success'
      (data) <-! wangyu.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-2', ipsid: 'ipsid-2'}
      data.should.have.property 'result', 'success'
      (data) <-! weike.interesting-points-channel.emit 'remove-comments', {cids: [comment-id]}
      data.should.have.property 'result', 'success'

    can '被删除的评论信息不会被查询到', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'remove-comments', {cids: [comment-id]}
      (data) <-! weike.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-2', skip: 0, limit: 10}
      data.comments.length.should.eql 0
      done!

    can '对应的会话的评论数会减少', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-2', skip: 0, limit: 10}
      interesting-point-session-before-operate = [.. for data.interesting-point-sessions when .._id is 'ipsid-2'][0]
      (data) <-! weike.interesting-points-channel.emit 'remove-comments', {cids: [comment-id]}
      (data) <-! weike.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-2', skip: 0, limit: 10}
      interesting-point-session-after-operate = [.. for data.interesting-point-sessions when .._id is 'ipsid-2'][0]
      interesting-point-session-before-operate.comments-count.should.eql (interesting-point-session-after-operate.comments-count + 1)
      done!
