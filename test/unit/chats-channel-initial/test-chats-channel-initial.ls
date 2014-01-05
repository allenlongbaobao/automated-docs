# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit/chats-channel-initial/fixture/'

describe 'unit test -- chats-channel-initial', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/chats-channel-initial', ['users', 'chats', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '用户已经登录时', !->
    can '能够返回正确的初始化数据', !(done)->
      (chats-channel, response-data) <-! initial-chats-channel {logged-in: true, uid: 'uid-1'}
      response-data.should.have.property 'privateChats'
      response-data.should.have.property 'groupChats'
      done!

    can '能够加入到正确的room中', !(done)->
      # 暂时不知道怎么测 = =!
      done!

  describe '用户未登录时', !->
    can '能够返回正确的初始化数据', !(done)->
      (chats-channel, response-data) <-! initial-chats-channel {logged-in: false, uid: 'uid-1'}
      response-data.should.eql {}
      done!

# -------------------- 华丽的分界线，下面是辅助代码 --------------------
initial-chats-channel = !(config, callback)->
  if config.logged-in is true
    (sid) <-! mock-logged-in-and-send-sid-back config.uid
    initial-client sid, callback
  else
    initial-client '', callback

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

initial-client = !(sid, callback)->
  socket-helper.initial-client {
    default-channel:
      options:
        request-initial-data:
          sid: sid
    chats-channel: {}
  }, !(channels, response-datas)->
    socket-helper.Sockets-destroyer.get!.add-socket channels.default-channel
    callback channels.chats-channel, response-datas.chats-channel
