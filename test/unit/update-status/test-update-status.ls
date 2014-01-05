# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//update-status/fixture/'

describe 'unit/ test -- update-status', !->

  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//update-status', ['users', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  xiaodong-info = {logged-in: true, uid: 'uid-1', urls: ['http://www.some.com']}
  baixin-info = {logged-in: true, uid: 'uid-2', urls: ['http://www.some.com']}

  get-client-status = (status)->
    if status is 'online' then 'online'
    else 'offline'

  can '请求报文出错时，能够给回出错信息', !(done)->
    (xiaodong) <-! socket-helper.get-client xiaodong-info
    (data) <-! xiaodong.users-channel.emit 'update-status', {this-property-cannot-appear-here: true}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    (data) <-! xiaodong.users-channel.emit 'update-status', {status: 'this is a invalid status'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.users-channel.emit 'update-status', {status: 'online'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '成功改变状态后', !->
    status = null
    valid-status = ['online', 'offline', 'invisible']

    before-each !(done)->
      random-index = (Math.random! * valid-status.length) .>>. 0
      status := valid-status[random-index]
      done!

    can '能够收到操作成功的响应', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'update-status', {status: status}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '好友能够收到通知', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      baixin.users-channel.on 'push-user-presence-updated', !(data)->
        data.should.have.property 'status', get-client-status status
        data.should.have.property '_id', xiaodong-info.uid
        data.should.have.property 'username'
        data.should.have.property 'avatar'
        data.should.have.property 'signature'
        data.should.have.property 'gender'
        data.should.have.property 'email'
        waiter1!
      xiaodong.users-channel.emit 'update-status', {status: status}, !(data)->
        data.should.have.property 'result', 'success'
        waiter2!

    can '同一个location的用户能够收到通知', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      baixin.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.location.should.have.property 'url', ''
        data.should.have.property 'user'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username'
        data.user.should.have.property 'avatar'
        data.user.should.have.property 'signature'
        data.user.should.have.property 'gender'
        data.user.should.have.property 'email'
        data.should.have.property 'action', if status is 'online' then 'join' else 'leave'
        waiter1!
      xiaodong.users-channel.emit 'update-status', {status: status}, !(data)->
        data.should.have.property 'result', 'success'
        waiter2!

    can '在用户曾经参与过的location的其他用户能够收到通知', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      baixin.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.should.have.property 'user'
        data.user.should.have.property 'status', get-client-status status
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username'
        data.user.should.have.property 'avatar'
        data.user.should.have.property 'signature'
        data.user.should.have.property 'gender'
        data.user.should.have.property 'email'
        data.user.should.have.property 'status', get-client-status status
        waiter1!
      xiaodong.users-channel.emit 'update-status', {status: status}, !(data)->
        data.should.have.property 'result', 'success'
        waiter2!

  describe '当用户切换到离线状态后', !->
    xiaodong = null

    before-each !(done)->
      (client) <-! socket-helper.get-client xiaodong-info
      (data) <-! client.users-channel.emit 'update-status', {status: 'offline'}
      data.should.have.property 'result', 'success'
      xiaodong := client
      done!

    can '无法进行需要登录的操作', !(done)->
      (data) <-! xiaodong.users-channel.emit 'send-friend-request', {uid: 'uid-3'}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.should.include-eql {message: '事件send-friend-request需要登录才能完成'}
      done!

    can '可以改变到在线或者隐身状态，并恢复操作能力', !(done)->
      (data) <-! xiaodong.users-channel.emit 'update-status', {status: 'online'}
      data.should.have.property 'result', 'success'
      (data) <-! xiaodong.users-channel.emit 'send-friend-request', {uid: 'uid-3'}
      data.should.have.property 'result', 'success'
      done!
