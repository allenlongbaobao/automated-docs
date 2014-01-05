# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-attended-users/fixture/'

describe 'unit test -- retrieve-attended-users', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-attended-users', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.locations-channel.emit 'retrieve-attended-users', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  # 下面的测例中，我们设定；
  # 1. 小东创建了私有兴趣点ipid-1和公有兴趣点ipid-2
  # 2. 在私有兴趣点ipid-1中@到了柏信和王瑜
  # 3. 王瑜在私有兴趣点ipid-1中创建了会话ipsid-3
  # 4. 伟科在公有兴趣点ipid-2的会话ipsid-2中创建了评论cid-1
  describe '报文正确时', !->
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
    wangyu-info = {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
    weike-info = {uid: 'uid-4', logged-in: true, urls: ['http://www.some.com']}

    can '若用户未登录，只能获取参与兴趣点的用户列表', !(done)->
      (channels, response-data) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}
      (data) <-! channels.locations-channel.emit 'retrieve-attended-users', {lid: response-data.locations-channel.locations.0._id}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'users' .with.length 2
      [.._id for data.users].should.include xiaodong-info.uid
      [.._id for data.users].should.include weike-info.uid
      done!

    can '若用户已登录, 可以获取相关的私有兴趣点的参与用户列表', !(done)->
      (channels, response-data) <-! socket-helper.get-client baixin-info
      (data) <-! channels.locations-channel.emit 'retrieve-attended-users', {lid: response-data.locations-channel.locations.0._id}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'users' .with.length 3
      [.._id for data.users].should.include xiaodong-info.uid
      [.._id for data.users].should.include weike-info.uid
      [.._id for data.users].should.include wangyu-info.uid
      done!
