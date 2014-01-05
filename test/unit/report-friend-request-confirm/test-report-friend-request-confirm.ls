# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//report-friend-request-confirm/fixture/'


# 小东向柏信和王瑜发送的好友请求
# 柏信接受了请求
# 王瑜拒绝了请求

describe 'unit/ test -- report-friend-request-confirm', !->
  xiaodong = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//report-friend-request-confirm', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '对于好友处理未作report时', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: false}
      xiaodong := xiaodong-channels
      done!

    can '小东登录时， rejectedFriends中有王瑜', !(done)->
      (data) <-! xiaodong.users-channel.emit 'login', {token: 'uid-1'}
      (data) <-! xiaodong.users-channel.emit 'retrieve-rejected-friends', {}
      data.should.have.property 'rejectedFriends' .with.length-of 1
      done!

    can '小东登录时， acceptedFriends中有柏信', !(done)->
      (data) <-! xiaodong.users-channel.emit 'login', {token: 'uid-1'}
      (data) <-! xiaodong.users-channel.emit 'retrieve-accepted-friends', {}
      data.should.have.property 'acceptedFriends' .with.length-of 1
      done!

  describe '对于王瑜的拒绝请求进行report', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['www.some.com']}
      xiaodong := xiaodong-channels
      done!

    can '小东收到其向王瑜发送的好友请求没有得到通过的推送, 报告其已收到, 得到服务器正确反应', !(done)->
      xiaodong.users-channel.emit 'report-friend-request-confirm', {uid: 'uid-3'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.not.have.property 'acceptedUser'
        done!

    can '小东报告之后， 退出， 再次登录，rejectedFriends中没有王瑜', !(done)->
      xiaodong.users-channel.emit 'report-friend-request-confirm', {uid: 'uid-3'}, !(data)->
        (data) <-! xiaodong.users-channel.emit 'logout', {token: 'uid-1'}
        (data) <-! xiaodong.users-channel.emit 'login', {token: 'uid-1'}
        (data) <-! xiaodong.users-channel.emit 'retrieve-rejected-friends', {}
        data.should.have.property 'rejectedFriends' .with.length-of 0
        done!

  describe '对于柏信接受请求进行report', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      xiaodong := xiaodong-channels
      done!

    can '小东收到其向柏信发送的好友请求得到通过的推送, 报告其已收到, 得到服务器正确反应', !(done)->
      xiaodong.users-channel.emit 'report-friend-request-confirm', {uid: 'uid-2'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.have.property 'acceptedUser'
        data.accepted-user.should.have.property '_id'
        data.accepted-user.should.have.property 'username'
        data.accepted-user.should.have.property 'email'
        data.accepted-user.should.have.property 'gender'
        data.accepted-user.should.have.property 'signature'
        data.accepted-user.should.have.property 'avatar'
        data.accepted-user.should.have.property 'status'
        done!

    can '小东报告之后， 退出， 再次登录， accpetedFriends中没有柏信', !(done)->
      xiaodong.users-channel.emit 'report-friend-request-confirm', {uid: 'uid-2'}, !(data)->
        (data) <-! xiaodong.users-channel.emit 'logout', {token: 'uid-1'}
        (data) <-! xiaodong.users-channel.emit 'login', {token: 'uid-1'}
        (data) <-! xiaodong.users-channel.emit 'retrieve-accepted-friends', {}
        data.should.have.property 'acceptedFriends' .with.length-of 0
        done!
