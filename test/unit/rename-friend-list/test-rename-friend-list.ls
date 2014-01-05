# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//rename-friend-list/fixture/'

# xiaodong -- uid-1
# 已有分组： 未分组， 大学同学
describe 'unit/ test -- rename-friend-list', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//rename-friend-list', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东未登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: false}
    can '小东重命名好友分组， 得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.users-channel.emit 'rename-friend-list', {old-list-name: '大学同学', new-list-name: '小学同学'}
      data.should.have.property 'result', 'failed'
      done!

  describe '小东已登录', !->
    xiaodong = null
    before-each !(done)->
      xiaodong-info = {uid: 'uid-1', logged-in: true}
      (xiaodong-channels) <-! socket-helper.get-client xiaodong-info
      xiaodong := xiaodong-channels
      done!

    can '小东重命名好友分组， 得到正确响应', !(done)->
      (data) <-! xiaodong.users-channel.emit 'rename-friend-list', {old-list-name: '大学同学', new-list-name: '小学同学'}
      data.should.have.property 'result', 'success'
      done!

    can '小东重命名好友分组， 原分组为默认分组‘未分组’，得到出错信息', !(done)->
      (data) <-! xiaodong.users-channel.emit 'rename-friend-list', {old-list-name: '未分组', new-list-name: '小学同学'}
      data.should.have.property 'result', 'failed'
      done!

    can '小东重命名好友分组， 原分组名不存在， 得到出错信息', !(done)->
      (data) <-! xiaodong.users-channel.emit 'rename-friend-list', {old-list-name: '中学同学', new-list-name: '小学同学'}
      data.should.have.property 'result', 'failed'
      done!

    can '小东重命名好友分组 ，新分组名为已存在的分组名， 得到出错信息', !(done)->
      (data) <-! xiaodong.users-channel.emit 'rename-friend-list', {old-list-name: '大学同学', new-list-name: '未分组'}
      data.should.have.property 'result', 'failed'
      done!
