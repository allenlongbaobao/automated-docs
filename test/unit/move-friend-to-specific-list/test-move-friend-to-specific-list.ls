# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//move-friend-to-specific-list/fixture/'

# xiaodong -- uid-1
describe 'unit/ test -- move-friend-to-specific-list', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//move-friend-to-specific-list', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东未登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: false, urls: ['http://www.some.com']}
    can '小东移动好友， 得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'move-friend-to-specific-list', {uid: 'uid-2', specific-list-name: '大学同学'}
      data.should.have.property 'result', 'failed'
      done!

  describe '小东已登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    can '小东移动正确好友到正确的分组，得到正确信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'move-friend-to-specific-list', {uid: 'uid-2', specific-list-name: '大学同学'}
      data.should.have.property 'result', 'success'
      done!

    can '小东移动正确好友到已存在分组， 登录， 再次登录，获取好友，移动成功', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'move-friend-to-specific-list', {uid: 'uid-2', specific-list-name: '大学同学'}
      (data) <-! xiaodong.users-channel.emit 'logout', {token: 'uid-1'}
      (data) <-! xiaodong.users-channel.emit 'login', {token: 'uid-1'}
      (data) <-! xiaodong.users-channel.emit 'retrieve-active-friends', {}
      data.active-friends[1].should.have.property 'users' .with.length-of 1
      done!

    can '小东移动不存在的好友至已存在的分组， 得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'move-friend-to-specific-list', {uid: 'uid-10', specific-list-name: '大学同学'}
      data.should.have.property 'result', 'failed'
      done!

    can '小东移动非好友至已存在的分组， 得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'move-friend-to-specific-list', {uid: 'uid-3', specific-list-name: '大学同学'}
      data.should.have.property 'result', 'failed'
      done!

    can '小东移动存在的好友至不存在的分组， 得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'move-friend-to-specific-list', {uid: 'uid-2', specific-list-name: '小学同学'}
      data.should.have.property 'result', 'failed'
      done!

