# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//send-friend-request/fixture/'
# 小东 -- uid-1
# 柏信 -- uid-2
# 小东向柏信发送好友请求
describe 'unit/ test -- send-friend-request', !->
  xiaodong = baixin = null
  before-each !(done)-> 
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//send-friend-request', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  # 被请求者柏信不在线
  describe 'requested user offline', !->
    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channel) <-! socket-helper.get-client {logged-in: false}
      xiaodong := xiaodong-channel
      baixin := baixin-channel
      done!

    can '小东向柏信发送好友请求, 柏信不在线, 不能收到推送信息', !(done)->
      baixin.users-channel.on 'push-new-friend-request', !(data)->
        data.should.fail '柏信不在线, 不能收到推送信息'

      xiaodong.users-channel.emit 'send-friend-request', request-send-friend-request-data, !(data)->
        <-! set-timeout _, 100
        done!

  # 被请求者柏信在线
  describe 'requested user online', !->
    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channel) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channel
      baixin := baixin-channel
      done!

    can '用户小东向用户柏信发送好友添加请求, 收到发送成功回复', !(done)->
      xiaodong.users-channel.emit 'send-friend-request', request-send-friend-request-data, !(data)->
        data.result.should.eql 'success'
        done!

    can '用户小东向柏信发送好友添加请求, 柏信在线, 能够收到请求提示', !(done)->
      baixin.users-channel.on 'push-new-friend-request', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'username'
        data.should.have.property 'gender'
        data.should.have.property 'email'
        data.should.have.property 'avatar'
        data.should.have.property 'signature'
        data.should.have.property 'status'
        done!
      xiaodong.users-channel.emit 'send-friend-request', request-send-friend-request-data, !(data)->

    can '用户小东向柏信发送好友添加请求, 在数据库中,两人的users应该写入数据', !(done)->
      xiaodong.users-channel.emit 'send-friend-request', request-send-friend-request-data, !(data)->
        <-! check-friend-data-in-db-correctly 'uid-1', 'uid-2', 'pending'
        <-! check-friend-data-in-db-correctly 'uid-2', 'uid-1', 'requested'
        done!

  describe '请求加已经是好友的用户为好友，返回错误信息', !(done)->
    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channel) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channel
      baixin := baixin-channel
      done!

    can '用户小东向柏信发送好友请求， 柏信接受后， 小东再次向柏信发送好友请求，收到错误信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!

      baixin.users-channel.on 'push-new-friend-request', !(data)->
        baixin.users-channel.emit 'handle-friend-request', {uid: 'uid-1', type: 'accepted'}, !(data)->
          waiter2!

      xiaodong.users-channel.emit 'send-friend-request', request-send-friend-request-data, !(data)->
        waiter1!

      <-! set-timeout _, 500
      xiaodong.users-channel.emit 'send-friend-request', request-send-friend-request-data, !(data)->
        data.should.have.property 'result', 'failed'
        waiter3!

#-------------------------------以下是辅助代码---------------------------
request-send-friend-request-data = utils.load-fixture FIXTURE_PATH + '/request-send-friend-request'


check-friend-data-in-db-correctly = !(user-id, friend-id, status, callback)->
  (db) <-! database.get-db
  db.at-plus['users'].findOne {_id: user-id}, (err, result)->
    debug err if err
    ungrouped-users = [..users for result.friends when ..name is '未分组'][0]
    for user in ungrouped-users when user.uid is friend-id
      user.status.should.eql status
    callback! if callback
     
