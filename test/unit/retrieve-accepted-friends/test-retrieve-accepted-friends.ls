# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//retrieve-accepted-friends/fixture/'

describe 'unit/ test -- retrieve-accepted-friends', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//retrieve-accepted-friends', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '用户未登录', !->
    xiaodong-info  = {uid: 'uid-1', logged-in: false, urls: ['www.some.com']}
    can '用户获取已接受的好友，返回错误信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'retrieve-accepted-friends', {}
      data.should.have.property 'result', 'failed'
      done!

  describe '用户已登录', !->
    xiaodong-info  = {uid: 'uid-1', logged-in: true, urls: ['www.some.com']}
    can '用户获取已接受的好友，返回正确信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'retrieve-accepted-friends', {}
      data.should.have.property 'result', 'success'
      data.accepted-friends[0].should.have.property '_id'
      data.accepted-friends[0].should.have.property 'username'
      data.accepted-friends[0].should.have.property 'gender'
      data.accepted-friends[0].should.have.property 'email'
      data.accepted-friends[0].should.have.property 'avatar'
      data.accepted-friends[0].should.have.property 'signature'
      done!


