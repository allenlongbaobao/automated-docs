# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//users-channel-initial/fixture/'

describe 'unit test -- default-channel-initial', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/default-channel-initial', [], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '初始化时没有传递sid，返回默认的session内容', !(done)->
    (default-channel, response-data) <-! initial-default-channel-without-passing-sid
    response-data.should.have.property 'sid'
    response-data.should.have.property 'session'
    response-data.sid.should.equal default-channel.socket.sessionid
    response-data.session.should.not.have.property 'uid'
    done!

  describe '初始化时传递了sid', !->
    can '通过sid能够找到session，能够恢复用户数据', !(done)->
      (sid) <-! mock-logged-in-and-send-sid-back
      (default-channel, response-data)<-! initial-default-channel-with-passing-sid sid
      response-data.should.have.property 'sid'
      response-data.should.have.property 'session'
      response-data.session.should.have.property 'uid'
      response-data.session.should.have.property 'status'
      response-data.session.uid.should.eql 'uid-1'
      response-data.session.status.should.eql 'online'
      done!

    can '通过sid无法找到session，返回默认的session内容', !(done)->
      (default-channel, response-data) <-! initial-default-channel-with-passing-sid 'inexistence-socket-id'
      response-data.should.have.property 'sid'
      response-data.should.have.property 'session'
      response-data.sid.should.eql default-channel.socket.sessionid
      response-data.session.should.not.have.property 'uid'
      response-data.session.should.not.have.property 'status'
      done!

# ------------------- 华丽的分界线，下面是辅助代码 -----------------------
initial-default-channel-without-passing-sid = !(callback)->
  socket-helper.initial-client {
    default-channel: {}
  }, !(channels, response-datas)->
    socket-helper.Sockets-destroyer.get!.add-socket channels.default-channel
    callback channels.default-channel, response-datas.default-channel

mock-logged-in-and-send-sid-back = !(callback)->
  socket-helper.initial-client {
    default-channel: {}
    testing-helper-channel:
      options:
        request-initial-data:
          uid: 'uid-1'
  }, !(channels, response-datas)->
    channels.default-channel.socket.disconnect!
    callback response-datas.testing-helper-channel.sid

initial-default-channel-with-passing-sid = !(sid, callback)->
  socket-helper.initial-client {
    default-channel:
      options:
        request-initial-data:
          sid: sid
  }, !(channels, response-datas)->
    socket-helper.Sockets-destroyer.get!.add-socket channels.default-channel
    callback channels.default-channel, response-datas.default-channel
