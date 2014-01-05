# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//handle-friend-request/fixture/'
describe 'unit/ test -- handle-friend-request', !->
  xiaodong = baixin = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    utils.clean-db-and-load-fixture 'unit//handle-friend-request', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

 # 请求者离线
  describe 'pending user offline', !->
    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channel) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channel
      baixin := baixin-channel
      xiaodong.users-channel.emit 'update-status', {status: 'offline'}, !(data)->
        done!

    can '柏信对于好友请求做同意处理, 小东能收到新增好友提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.users-channel.on 'push-friend-request-confirm', !(data)->
        data.should.have.property 'type', 'accepted'
        waiter2!

      baixin.users-channel.emit 'handle-friend-request', {type: 'accepted', uid: 'uid-1'}, !(data)->
        waiter1!

    can '柏信对于好友请求做拒绝处理, 小东能收到好友请求被拒绝的提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.users-channel.on 'push-friend-request-confirm', !(data)->
        data.should.have.property 'type', 'rejected'
        waiter2!

      baixin.users-channel.emit 'handle-friend-request', {type: 'rejected', uid: 'uid-1'}, !(data)->
        waiter1!

  # 请求者隐身 
  describe 'pending user invisible', !->
    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channel) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channel
      baixin := baixin-channel
      xiaodong.users-channel.emit 'update-status', {status: 'invisible'}, !(data)->
        done!

    can '柏信对于好友请求做同意处理, 小东能够收到新增好友提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.users-channel.on 'push-friend-request-confirm', !(data)->
        data.should.have.property 'type', 'accepted'
        waiter2!

      baixin.users-channel.emit 'handle-friend-request', {type: 'accepted', uid: 'uid-1'}, !(data)->
        waiter1!

    can '柏信对好友请求做拒绝处理, 小东能够收到被拒绝的提示',  !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.users-channel.on 'push-friend-request-confirm', !(data)->
        data.should.have.property 'type', 'rejected'
        waiter2!

      baixin.users-channel.emit 'handle-friend-request', {type: 'rejected', uid: 'uid-1'}, !(data)->
        waiter1!

  # 请求者在线
  describe 'pending user online', !->
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}

    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client xiaodong-info
      (baixin-channels) <-! socket-helper.get-client baixin-info
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '柏信对于好友请求不做处理， 下次登录时， reuqested-user中应该有小东', !(done)->
      (data) <-! baixin.users-channel.emit 'logout', {token: baixin-info.uid}
      (data) <-! baixin.users-channel.emit 'login', {token: baixin-info.uid}
      (data) <-! baixin.users-channel.emit 'retrieve-requested-friends', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'requestedFriends'
      data.should.have.property 'requestedFriends' .with.length-of 1
      done!

    can '柏信对于好友请求做同意处理, 服务端能返回正确处理结果', !(done)->
      baixin.users-channel.emit 'handle-friend-request', {type: 'accepted', uid: 'uid-1'}, !(data)->
        data.should.have.property 'result', 'success'
        data.new-friend.should.have.property '_id'
        data.new-friend.should.have.property 'username'
        data.new-friend.should.have.property 'gender'
        data.new-friend.should.have.property 'email'
        data.new-friend.should.have.property 'avatar'
        data.new-friend.should.have.property 'signature'
        data.new-friend.should.have.property 'status'
        done!

    can '柏信对于好友请求做同意处理, 小东能够收到新增好友提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.users-channel.on 'push-friend-request-confirm', !(data)->
        data.should.have.property 'type', 'accepted'
        waiter2!

      baixin.users-channel.emit 'handle-friend-request', {type: 'accepted', uid: 'uid-1'}, !(data)->
        waiter1!

    can '柏信对于好友请求做同意处理，下次登录时， requestd-user中不应该有小东', !(done)->
      (data) <-! baixin.users-channel.emit 'handle-friend-request', {type: 'accepted', uid: 'uid-1'}
      (data) <-! baixin.users-channel.emit 'logout', {token: baixin-info.uid}
      (data) <-! baixin.users-channel.emit 'login', {token: baixin-info.uid}
      (data) <-! baixin.users-channel.emit 'retrieve-requested-friends', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'requestedFriends'
      data.should.have.property 'requestedFriends' .with.length-of 0
      done!

    can '柏信对于好友请求做同意处理, 数据库应该得到更新', !(done)->
      baixin.users-channel.emit 'handle-friend-request', {type: 'accepted', uid: 'uid-1'}, !(data)->
        <-!check-friend-data-in-db-correctly 'uid-2', 'uid-1', 'active'
        <-!check-friend-data-in-db-correctly 'uid-1', 'uid-2', 'accepted'
        done!

    can '柏信对于好友请求做拒绝处理, 服务器能返回正确处理结果', !(done)->
      baixin.users-channel.emit 'handle-friend-request', {type: 'rejected', uid: 'uid-1'}, !(data)->
        data.should.have.property 'result', 'success'
        done!

    can '柏信对于好友请求做拒绝处理, 数据库应该得到更新', !(done)->
      baixin.users-channel.emit 'handle-friend-request', {type: 'rejected', uid: 'uid-1'}, !(data)->
        <-! check-friend-data-in-db-correctly 'uid-1', 'uid-2', 'rejected'
        done!

    can '柏信对于好友请求做拒绝处理， 下次登录时，requested-user中不应该有小东', !(done)->
      (data) <-! baixin.users-channel.emit 'handle-friend-request', {type: 'rejected', uid: 'uid-1'}
      (data) <-! baixin.users-channel.emit 'logout', {token: baixin-info.uid}
      (data) <-! baixin.users-channel.emit 'login', {token: baixin-info.uid}
      (data) <-! baixin.users-channel.emit 'retrieve-requested-friends', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'requestedFriends'
      data.should.have.property 'requestedFriends' .with.length-of 0
      done!

    can '柏信对于好友请求做拒绝处理, 小东能够收到好友请求被拒绝的提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.users-channel.on 'push-friend-request-confirm', !(data)->
        data.should.have.property 'type', 'rejected'
        data.requested-user.should.have.property '_id'
        data.requested-user.should.have.property 'username'
        data.requested-user.should.have.property 'gender'
        data.requested-user.should.have.property 'email'
        data.requested-user.should.have.property 'avatar'
        data.requested-user.should.have.property 'signature'
        data.requested-user.should.have.property 'status'
        waiter2!

      baixin.users-channel.emit 'handle-friend-request', {type: 'rejected', uid: 'uid-1'}, !(data)->
        waiter1!

check-friend-data-in-db-correctly = !(user-id, friend-id, status, callback)->
  (db) <-! database.get-db
  db.at-plus['users'].findOne {_id: user-id}, (err, result)->
    debug err if err
    ungrouped-users = [..users for result.friends when ..name is '未分组'][0]
    for user in ungrouped-users when user.uid is friend-id
      user.status.should.eql status
    callback! if callback
