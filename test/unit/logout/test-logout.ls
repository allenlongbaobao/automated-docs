# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit/logout/fixture/'

describe 'unit test -- logout', !->
  xiaodong = baixin = wangyu = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/logout', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
    (data) <-! client.users-channel.emit 'logout', {this-property-cannot-appear-here: true}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，仍然能够正常退出', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.users-channel.emit 'logout', {token: 'this token does not affect when user is logout.'}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    done!

  describe '正常退出时', !->
    # 在这个测例中，我们设定：
    # 1. 柏信是小东的好友
    # 2. 王瑜不是小东的好友
    # 3. token暂不加密，直接用uid
    xiaodong-info = {logged-in: true, uid: 'uid-1', urls: ['http://www.some.com']}
    baixin-info = {logged-in: true, uid: 'uid-2'}
    wangyu-info = {logged-in: true, uid: 'uid-3', urls: ['http://www.some.com']}

    can '用户能够收到退出成功提示', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '能够正确退出好友的rooms', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      xiaodong.users-channel.on 'push-user-presence-updated', !(data)->
        data.fail '退出用户收到了好友的上线通知'

      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      (baixin) <-! socket-helper.get-client baixin-info
      <-! set-timeout _, 100 # 确保有时间验证小东是否收到了好友的上线通知
      done!

    can '能够通知好友用户已经退出登录', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (baixin) <-! socket-helper.get-client baixin-info
      (wangyu) <-! socket-helper.get-client wangyu-info
      (xiaodong) <-! socket-helper.get-client xiaodong-info

      baixin.users-channel.on 'push-user-presence-updated', !(data)->
        data.should.have.property '_id', xiaodong-info.uid
        data.should.have.property 'username', 'xiaodong'
        data.should.have.property 'status', 'offline'
        waiter1!

      wangyu.users-channel.on 'push-user-presence-updated', !(data)->
        data.fail '非好友收到了用户的下线通知'

      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      <-! set-timeout _, 100 # 确保有足够的时间验证王瑜是否收到了小东的下线通知
      waiter2!

    can '用户无法进行任何需要登录权限才能执行的操作', !(done)->
      # 这里本应该验证所有的API，暂且只挑几个进行验证
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'
      (data) <-! xiaodong.interesting-points-channel.emit 'like-it', {type: 'interesting-point', id: 'ipid-1'}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.should.include-eql {message: '事件like-it需要登录才能完成'}
      (data) <-! xiaodong.users-channel.emit 'send-friend-request', {uid: 'uid-1'}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.should.include-eql {message: '事件send-friend-request需要登录才能完成'}
      done!

    can '在同一个location的其他用户收到通知', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info

      wangyu.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'action', 'leave'
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.should.have.property 'user'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username', 'xiaodong'
        done!

      xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}, !(data)->
        data.should.have.property 'result', 'success'

    can '在用户参与过的location的其他用户收到通知', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info

      wangyu.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.should.have.property 'user'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username', 'xiaodong'
        data.user.should.have.property 'status', 'offline'
        done!

      xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}, !(data)->
        data.should.have.property 'result', 'success'

    # 测例中我们设定：
    # 小东关注了location(lid-2)，即http://www.baidu.com
    can '能够离开关注的location的room', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'
      xiaodong.users-channel.on 'push-active-user-updated', !(data)->
        data.should.fail '退出登录后，收到了关注的location的用户更新消息'
      (baixin) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1', urls: ['http://www.baidu.com']}
      <-! set-timeout _, 100 # 确保有足够的时间验证push-active-user-updated是否被触发
      done!

    can '能够离开创建的兴趣点的room', !(done)->
      request-create-a-new-interesting-point-session = ipid: 'ipid-1', title: 'kasdjkasdjfkj'
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-session-updated-in-created-interesting-point', !(data)->
        data.fail '退出登录后，仍然收到了创建的兴趣点的更新消息'

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      <-! set-timeout _ , 100
      data.should.have.property 'result', 'success'
      done!

    can '能够离开关注的兴趣点的room', !(done)->
      request-create-a-new-interesting-point-session = ipid: 'ipid-1', title: 'kasdjkasdjfkj'
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-session-updated-in-watching-interesting-point', !(data)->
        data.fail '退出登录后，仍然收到了关注的兴趣点的更新消息'

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      <-! set-timeout _ , 100
      data.should.have.property 'result', 'success'
      done!

    can '能够离开创建的会话的room', !(done)->
      request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'kasfjkas', voice-content: 'askdfj', is-anonymous: false
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-comment-updated-in-created-session', !(data)->
        data.fail '退出登录后，仍然收到了创建的兴趣点会话的更新消息'

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      <-! set-timeout _ , 100
      data.should.have.property 'result', 'success'
      done!

    can '能够离开关注的会话的room', !(done)->
      request-create-a-new-comment = ipid: 'ipid-2', ipsid: 'ipsid-2', type: 'ips-msg', original-content-type: 'text', text-content: 'kasfjkas', voice-content: 'askdfj', is-anonymous: false
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-comment-updated-in-watching-session', !(data)->
        data.fail '退出登录后，仍然收到了关注的兴趣点会话的更新消息'

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      <-! set-timeout _ , 100
      data.should.have.property 'result', 'success'
      done!

    can '能够离开创建的评论的room', !(done)->
      request-create-a-new-reply = ipid: 'ipid-2', ipsid: 'ipsid-2', r-mid: 'cid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'kasfjkas', voice-content: 'askdfj', is-anonymous: false
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! xiaodong.users-channel.emit 'logout', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-reply-updated-in-created-comment', !(data)->
        data.fail '退出登录后，仍然收到了创建的评论的更新消息'

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      <-! set-timeout _ , 100
      data.should.have.property 'result', 'success'
      done!
