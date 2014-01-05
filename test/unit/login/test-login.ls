# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit/login/fixture/'

describe 'unit test -- login', !->
  xiaodong = baixin = wangyu = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/login', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错报文', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.users-channel.emit 'login', {this-property-cannot-appear-here: true}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '传递的token找不到用户时，能够给回出错反馈', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.users-channel.emit 'login', {token: 'this is a token which cannot find a user.'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '登录成功后', !->
    # 这个测例中，我们设定：
    # 1. 小东和柏信是好友
    # 2. 小东和王瑜不是好友
    # 3. token暂不加密，直接使用用户的id
    #
    # 4. 小东和王瑜在同一个location(http://www.some.com)中
    # 5. 小东曾经参与过location(http://www.some.com)
    xiaodong-info = {logged-in: true, uid: 'uid-1', urls: ['http://www.some.com']}
    baixin-info = {logged-in: true, uid: 'uid-2'}
    wangyu-info = {logged-in: true, uid: 'uid-3', urls: ['http://www.some.com']}

    can '能够返回正确的用户信息', !(done)->
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'user'
      data.user.should.have.property '_id', xiaodong-info.uid
      data.user.should.have.property 'username', 'xiaodong'
      done!

    can '能够加入到好友的rooms中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      xiaodong.users-channel.on 'push-user-presence-updated', !(data)->
        data.should.have.property '_id', baixin-info.uid
        data.should.have.property 'username', 'baixin'
        data.should.have.property 'status', 'online'
        waiter1!
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      (baixin) <-! socket-helper.get-client baixin-info
      waiter2!

    can '好友能够收到用户的上线通知', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      (baixin) <-! socket-helper.get-client baixin-info
      (wangyu) <-! socket-helper.get-client wangyu-info

      baixin.users-channel.on 'push-user-presence-updated', !(data)->
        data.should.have.property '_id', xiaodong-info.uid
        data.should.have.property 'username', 'xiaodong'
        waiter1!

      wangyu.users-channel.on 'push-user-presence-updated', !(data)->
        data.should.fail '非好友收到了用户的上线通知'

      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      <-! set-timeout _, 100 # 确保有足够的时间验证王瑜是否收到了通知
      waiter2!

    can '在同个location的用户能够收到通知', !(done)->
      (xiaodong) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}
      (wangyu) <-! socket-helper.get-client wangyu-info

      wangyu.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.should.have.property 'user'
        data.should.have.property 'action', 'join'
        data.location.should.have.property 'id', 'lid-1'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username', 'xiaodong'
        done!

      xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}, !(data)->
        data.should.have.property 'result', 'success'

    can '在用户曾经参与过的location的其他用户收到通知', !(done)->
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (wangyu) <-! socket-helper.get-client wangyu-info

      wangyu.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.should.have.property 'user'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username', 'xiaodong'
        data.user.should.have.property 'status', 'online'
        done!

      xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}, !(data)->
        data.should.have.property 'result', 'success'

    can '能够加入关注的locations的room中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'
      xiaodong.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.location.should.have.property 'url', ''
        data.should.have.property 'user'
        data.user.should.have.property '_id', wangyu-info.uid
        data.should.have.property 'action', 'join'
        waiter1!
      (wangyu) <-! socket-helper.get-client wangyu-info
      waiter2!

    can '能够加入到创建的兴趣点的room中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      request-create-a-new-interesting-point-session = ipid: 'ipid-1', title: 'hahaha'
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-session-updated-in-created-interesting-point', !(data)->
        waiter1!

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      data.should.have.property 'result', 'success'
      waiter2!

    can '能够加入到关注的兴趣点的room中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      request-create-a-new-interesting-point-session = ipid: 'ipid-2', title: 'hahaha'
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-session-updated-in-watching-interesting-point', !(data)->
        waiter1!

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      data.should.have.property 'result', 'success'
      waiter2!

    can '能够加入到创建的会话中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'asdjfkasdjfk', voice-content: 'kasfjkasdjf', is-anonymous: false
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-comment-updated-in-created-session', !(data)->
        waiter1!

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      data.should.have.property 'result', 'success'
      waiter2!

    can '能够加入到关注的会话中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      request-create-a-new-comment = ipid: 'ipid-2', ipsid: 'ipsid-2', type: 'ips-msg', original-content-type: 'text', text-content: 'asdjfkasdjfk', voice-content: 'kasfjkasdjf', is-anonymous: false
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-comment-updated-in-watching-session', !(data)->
        waiter1!

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      data.should.have.property 'result', 'success'
      waiter2!

    can '能够加入到创建的评论中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      request-create-a-new-reply = ipid: 'ipid-2', ipsid: 'ipsid-2', r-mid: 'cid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'asdjfkasdjfk', voice-content: 'kasfjkasdjf', is-anonymous: false
      (xiaodong) <-! socket-helper.get-client {logged-in: false}
      (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (data) <-! xiaodong.users-channel.emit 'login', {token: xiaodong-info.uid}
      data.should.have.property 'result', 'success'

      xiaodong.interesting-points-channel.on 'push-reply-updated-in-created-comment', !(data)->
        waiter1!

      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      data.should.have.property 'result', 'success'
      waiter2!
