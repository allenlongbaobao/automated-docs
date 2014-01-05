# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//retrieve-friends/fixture/'

# 小东 -- uid-1
# 柏信 -- uid-2 -- 在线
# 王瑜 -- uid-3 -- 隐身
# 小龙 -- uid-4 -- 离线
# 伟科 -- uid-5 -- 未登录
describe 'unit/ test -- retrieve-friends', !->
  xiaodong = baixin = wangyu = xiaolong = weike = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//retrieve-friends', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

# 小东未登录
  describe '小东未登录', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: false }
      xiaodong := xiaodong-channels
      done!

    can '小东未登录, 获取好友时 ,系统提示其先登录', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', request-retrieve-friends-data, !(data)->
        data.should.have.property 'result', 'failed'
        done!

# 小东已登录
# 由于数据库中用户数量限制, 约定count = 2 (每次返回个数最大值)
  describe '小东已登录', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: true }
      (baixin-channels) <-! socket-helper.get-client { uid: 'uid-2', logged-in: true}
      (wangyu-channels) <-! socket-helper.get-client { uid: 'uid-3', logged-in: false}
      (xiaolong-channels) <-! socket-helper.get-client { uid: 'uid-4', logged-in: false}
      (weike-channels) <-! socket-helper.get-client { uid: 'uid-5', logged-in: false}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      xiaolong := xiaolong-channels
      weike := weike-channels

      wangyu.users-channel.emit 'update-status', { status: 'invisible' }, !(data)->
      xiaolong.users-channel.emit 'update-status', { status: 'offline' }, !(data)->
      done!



    can '小东获取好友, 偏移量为1, 数量为2', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', {offset: 1, count: 2}, !(data)->
        data.should.have.property 'result', 'success'
        #data.users.should.have.with.length-of 2
        data.users[0].should.have.property 'username'
        data.users[0].should.have.property '_id'
        data.users[0].should.have.property 'gender'
        data.users[0].should.have.property 'email'
        data.users[0].should.have.property 'signature'
        data.users[0].should.have.property 'status'
        done!

    can '小东获取好友, 偏移量为2, 数量为2', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', {offset: 2, count: 2} , !(data)->
        data.should.have.property 'result', 'success'
        #data.users.should.have.with.length-of 2
        data.users[0].should.have.property 'username'
        data.users[0].should.have.property '_id'
        data.users[0].should.have.property 'gender'
        data.users[0].should.have.property 'email'
        data.users[0].should.have.property 'signature'
        data.users[0].should.have.property 'status'
        done!

    can '小东获取好友, 偏移量为1, 数量为3', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', {offset: 1, count: 3} , !(data)->
        data.should.have.property 'result', 'success'
        #data.users.should.have.with.length-of 3
        data.users[0].should.have.property 'username'
        data.users[0].should.have.property '_id'
        data.users[0].should.have.property 'gender'
        data.users[0].should.have.property 'email'
        data.users[0].should.have.property 'signature'
        data.users[0].should.have.property 'status'
        done!
    
    can '小东获取好友, 偏移量为2, 数量为3', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', {offset: 2, count: 3} , !(data)->
        data.should.have.property 'result', 'success'
        #data.users.should.have.with.length-of 2
        data.users[0].should.have.property 'username'
        data.users[0].should.have.property '_id'
        data.users[0].should.have.property 'gender'
        data.users[0].should.have.property 'email'
        data.users[0].should.have.property 'signature'
        data.users[0].should.have.property 'status'
        done!

    can '小东获取好友, 偏移量为1, 数量为4', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', {offset: 1, count: 4} , !(data)->
        data.should.have.property 'result', 'success'
        #data.users.should.have.with.length-of 3
        data.users[0].should.have.property 'username'
        data.users[0].should.have.property '_id'
        data.users[0].should.have.property 'gender'
        data.users[0].should.have.property 'email'
        data.users[0].should.have.property 'signature'
        data.users[0].should.have.property 'status'
        done!

    can '小东获取好友, 偏移量为1, 数量为5', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', {offset: 1, count: 5} , !(data)->
        data.should.have.property 'result', 'success'
        #data.users.should.have.with.length-of 3
        data.users[0].should.have.property 'username'
        data.users[0].should.have.property '_id'
        data.users[0].should.have.property 'gender'
        data.users[0].should.have.property 'email'
        data.users[0].should.have.property 'signature'
        data.users[0].should.have.property 'status'
        done!

    can '小东获取好友, 偏移量为1, 数量为1', !(done)->
      xiaodong.users-channel.emit 'retrieve-friends', {offset: 1, count: 1} , !(data)->
        data.should.have.property 'result', 'success'
        #data.users.should.have.with.length-of 1
        data.users[0].should.have.property 'username'
        data.users[0].should.have.property '_id'
        data.users[0].should.have.property 'gender'
        data.users[0].should.have.property 'email'
        data.users[0].should.have.property 'signature'
        data.users[0].should.have.property 'status'
        done!
# ------------------------------- 辅助函数 ---------------------------------------#
request-retrieve-friends-data = utils.load-fixture FIXTURE_PATH + '/request-retrieve-friends'

