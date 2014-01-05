# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-active-users/fixture/'

describe 'unit test -- retrieve-active-users', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-active-users', ['locations', 'users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  #can '请求报文出错时，能够返回出错信息', !(done)->
  #  (channels) <-! socket-helper.get-client {logged-in: false}
  #  (data) <-! channels.locations-channel.emit 'retrieve-active-users', {}
  #  data.should.have.property 'result', 'failed'
  #  data.should.have.property 'errors'
  #  data.errors.length.should.above 0
  #  done!

  #can '对于不存在的location，能够通过url来获得当前location的在线用户列表', !(done)->
  #  (client1) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1', urls: ['http://www.not-in-database.com']}
  #  (client2) <-! socket-helper.get-client {logged-in: true, uid: 'uid-2', urls: ['http://www.some.com']}
  #  (client3) <-! socket-helper.get-client {logged-in: true, uid: 'uid-3', urls: ['http://www.not-in-database.com']}
  #  (client4) <-! socket-helper.get-client {logged-in: true, uid: 'uid-4', urls: ['http://www.not-in-database.com']}
  #  (data) <-! client4.locations-channel.emit 'retrieve-active-users', {url: 'http://www.not-in-database.com', lid: ''}
  #  data.should.have.property 'result', 'success'
  #  data.should.have.property 'errors' .with.length 0
  #  data.should.have.property 'users' .with.length 3
  #  [.._id for data.users].should.include 'uid-1'
  #  [.._id for data.users].should.include 'uid-3'
  #  [.._id for data.users].should.include 'uid-4'
  #  done!

  #can '对于已经存在的location，能够通过lid来获得当前location的在线用户列表', !(done)->
  #  (client1) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1', urls: ['http://www.some.com']}
  #  (client2) <-! socket-helper.get-client {logged-in: true, uid: 'uid-2', urls: ['http://www.some.com']}
  #  (client3) <-! socket-helper.get-client {logged-in: true, uid: 'uid-3', urls: ['http://www.not-in-database.com']}
  #  (client4, response-data) <-! socket-helper.get-client {logged-in: true, uid: 'uid-4', urls: ['http://www.some.com']}
  #  lid = response-data.locations-channel.locations.0._id
  #  (data) <-! client4.locations-channel.emit 'retrieve-active-users', {url: '', lid: lid}
  #  data.should.have.property 'result', 'success'
  #  data.should.have.property 'errors' .with.length 0
  #  data.should.have.property 'users' .with.length 3
  #  [.._id for data.users].should.include 'uid-1'
  #  [.._id for data.users].should.include 'uid-2'
  #  [.._id for data.users].should.include 'uid-4'
  #  done!
