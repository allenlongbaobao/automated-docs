# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//remove-friend-list/fixture/'

#xiaodong  -- uid-1
describe 'unit/ test -- remove-friend-list', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//remove-friend-list', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东未登录', !->
    xiaodong-info= {uid: 'uid-1', logged-in: false, urls: ['http://www.some.com']}
    can '小东删除好友分组，大学同学，得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'remove-friend-list', {list-name: '大学同学'}
      data.should.have.property 'result', 'failed'
      done!

  describe '小东已登录', !->
    xiaodong-info= {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}

    can '小东删除好友分组，大学同学，得到正确信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'remove-friend-list', {list-name: '大学同学'}
      data.should.have.property 'result', 'success'
      done!

    can '小东删除好友分组，大学同学，登出，再次登录，原先在该分组中的好友移动到了未分组中', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'remove-friend-list', {list-name: '大学同学'}
      (data) <-! xiaodong.users-channel.emit 'logout', {token: 'uid-1'}
      (data) <-! xiaodong.users-channel.emit 'login', {token: 'uid-1'}
      (data) <-! xiaodong.users-channel.emit 'retrieve-active-friends', {}
      data.should.have.property 'activeFriends'
      data.should.have.property 'activeFriends' .with.length-of 1
      data.active-friends[0].should.have.property 'users' .with.length-of 2
      done!

    can '小东删除好友分组，小学同学（不存在）, 得到出错信息 ', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'remove-friend-list', {list-name: '小学同学'}
      data.should.have.property 'result', 'failed'
      done!

    can "小东删除默认分组 '未分组', 得到出错信息", !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'remove-friend-list', {list-name: '未分组'}
      data.should.have.property 'result', 'failed'
      done!


