# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//remove-friends/fixture/'

describe 'unit/ test -- remove-friends', !->
  xiaodong = baixin = wangyu = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//remove-friends', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  # 删除者未登录
  describe 'handler logged out', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: false}
      xiaodong := xiaodong-channels
      done!

    can '小东删除好友柏信, 系统提醒其未登录', !(done)->
      xiaodong.users-channel.emit 'remove-friends', {uids: ['uid-2']}, !(data)->
        data.should.have.property 'result', 'failed'
        done!

  # 被删除者离线
  describe 'removed user offline', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client { uid: 'uid-2', logged-in: false}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '小东删除好友柏信, 柏信不能收到消息提示', !(done)->
      baixin.users-channel.on 'push-friend-updated', !(data)->
        data.should.fail '柏信不能收到消息提示'
      xiaodong.users-channel.emit 'remove-friends', request-remove-friends-data, !(data)->
        <-! set-timeout _, 10
        done!

  # 被删除者在线, 小东删除柏信
  describe 'removed user online', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client { uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '小东发送删除好友柏信的请求, 能够收到操作成功的响应', !(done)->
      xiaodong.users-channel.emit 'remove-friends', request-remove-friends-data, !(data)->
        data.should.have.property 'result', 'success'
        done!

  describe 'removed user online', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client { uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '小东发送删除好友柏信的请求, 柏信能够收到消息提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      baixin.users-channel.on 'push-friend-updated', !(data)->
        data.should.have.property 'type', 'removed'
        data.user.should.have.property '_id'
        data.user.should.have.property 'username'
        data.user.should.have.property 'gender'
        data.user.should.have.property 'email'
        data.user.should.have.property 'avatar'
        data.user.should.have.property 'signature'
        waiter2!
      xiaodong.users-channel.emit 'remove-friends', request-remove-friends-data, !(data)->
        waiter1!

  # 被删除者在线, 柏信删除小东
  describe 'removed user online', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client { uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '柏信发送删除好友小东的请求, 能够收到操作成功的响应', !(done)->
      baixin.users-channel.emit 'remove-friends', {uids: ['uid-1']}, !(data)->
        data.should.have.property 'result', 'success'
        done!

  describe 'removed user online', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client { uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '柏信发送删除好友小东的请求, 小东能够收到消息提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      xiaodong.users-channel.on 'push-friend-updated', !(data)->
        data.should.have.property 'type', 'removed'
        waiter2!
      baixin.users-channel.emit 'remove-friends', {uids: ['uid-1']}, !(data)->
        waiter1!

  describe "removed user not it's friend", !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client { uid: 'uid-1', logged-in: true}
      xiaodong := xiaodong-channels
      done!

    can '柏信发送删除好友王瑜的请求， 但是王瑜不是柏信的好友， 得到错误信息', !(done)->
      xiaodong.users-channel.emit 'remove-friends', {uids: ['uid-3']}, !(data)->
        data.result.should.eql 'failed'
        done!

  describe "removed user not it's friend", !->
    before-each !(done)->
      (wangyu-channels) <-! socket-helper.get-client { uid: 'uid-3', logged-in: true} 
      wangyu := wangyu-channels
      done!

    can '王瑜发送删除好友柏信的请求， 但是柏信不是王瑜的好友， 得到错误信息', !(done)->
      wangyu.users-channel.emit 'remove-friends', {uids: ['uid-1']}, !(data)->
        data.result.should.eql 'failed'
        done!

# ---------------------- 以下辅助函数 -------------------------#

request-remove-friends-data = utils.load-fixture FIXTURE_PATH + '/request-remove-friends'

