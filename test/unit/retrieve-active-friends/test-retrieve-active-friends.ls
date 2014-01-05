# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-active-friends/fixture/'

# 小东
describe 'unit test -- retrieve-active-friends', !->
  xiaodong = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-active-friends', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '用户未登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: false, urls: ['www.some.com']}
    can '获取正式好友， 返回错误信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (active-friends) <-! xiaodong.users-channel.emit 'retrieve-active-friends', {}
      active-friends.should.have.property 'result', 'failed'
      done!

  describe '用户登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['www.some.com']}
    can '获取正式好友， 返回正确信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (active-friends) <-! xiaodong.users-channel.emit 'retrieve-active-friends', {}
      active-friends.should.have.property 'result', 'success'
      active-friends.should.have.property 'activeFriends'
      active-friends.active-friends[0].should.have.property 'name'
      active-friends.active-friends[0].should.have.property 'users'
      active-friends.active-friends[0].users[0].should.have.property '_id'
      active-friends.active-friends[0].users[0].should.have.property 'username'
      active-friends.active-friends[0].users[0].should.have.property 'gender'
      active-friends.active-friends[0].users[0].should.have.property 'email'
      active-friends.active-friends[0].users[0].should.have.property 'avatar'
      active-friends.active-friends[0].users[0].should.have.property 'signature'
      active-friends.active-friends[0].users[0].should.have.property 'status'
      done!

