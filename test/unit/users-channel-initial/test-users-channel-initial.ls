# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//users-channel-initial/fixture/'

describe 'unit/ test -- users-channel-initial', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//users-channel-initial', ['users', 'circles'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '用户已经登陆时', !->
    can '能够返回正确的初始化数据', !(done)->
      (users-channel, response-data)<-! initial-users-channel {logged-in: true, uid: 'uid-1'}
      response-data.should.have.property '_id'
      response-data.should.have.property 'username'
      response-data.should.have.property 'gender'
      response-data.should.have.property 'email'
      response-data.should.have.property 'signature'
      response-data.should.have.property 'avatar'
      response-data.should.have.property 'acceptedFriends'
      response-data.should.have.property 'rejectedFriends'
      response-data.should.have.property 'pendingFriends'
      response-data.should.have.property 'activeFriends'
      response-data.should.have.property 'acceptedCircles'
      response-data.should.have.property 'rejectedCircles'
      response-data.should.have.property 'activeCircles'
      response-data.should.have.property 'pendingCircles'
      response-data.should.have.property 'invitedCircles'
      done!

    can '加入到正确的room中', !(done)->
      # 我们设定，uid-1 和 uid-2 是好友
      # uid-1 先初始化，而后 uid-2 再初始化
      # 此时，若初始化时正确加入到room中，uid-1能收到uid-2的上线消息
      (user1) <-! initial-users-channel {logged-in: true, uid: 'uid-1'}
      user1.on 'push-user-presence-updated', !(user)->
        user.should.have.property '_id'
        user.should.have.property 'username'
        user.should.have.property 'email'
        user.should.have.property 'gender'
        user.should.have.property 'signature'
        user.should.have.property 'avatar'
        user.should.have.property 'status'
        user._id.should.eql 'uid-2'
        user.status.should.eql 'online'
        done!
      #
      initial-users-channel {logged-in: true, uid: 'uid-2'}, !->

  describe '用户未登录时', !->
    can '返回正确的初始化数据', !(done)->
      (users-channel, response-data)<-! initial-users-channel {logged-in: false, uid: 'uid-1'}
      response-data.should.eql {}
      done!

# ------------------ 美丽的分界线，下面是辅助代码 --------------------
initial-users-channel = !(config, callback)->
  if config.logged-in is true
    (sid) <-! mock-logged-in-and-send-sid-back config.uid
    initial-client sid, callback
  else
    initial-client '', callback

initial-client = !(sid, callback)->
  socket-helper.initial-client {
    default-channel:
      options:
        request-initial-data:
          sid: sid
    users-channel: {}
  }, !(channels, response-datas)->
    socket-helper.Sockets-destroyer.get!.add-socket channels.default-channel
    callback channels.users-channel, response-datas.users-channel

mock-logged-in-and-send-sid-back = !(uid, callback)->
  socket-helper.initial-client {
    testing-helper-channel:
      options:
        request-initial-data:
          uid: uid
    default-channel: {}
  }, !(channels, response-datas)->
    channels.default-channel.socket.disconnect!
    callback response-datas.default-channel.sid
