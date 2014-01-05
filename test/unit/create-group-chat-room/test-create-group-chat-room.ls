# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//create-group-chat-room/fixture/'

describe 'unit/ test -- create-group-chat-room', !->
  xiaodong = baixin = wangyu = weike = null
  group-chat-schema =
    initial-members: ['uid-3']
    name: '@+ 之家'
    signature: '我们是@+ers'
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//create-group-chat-room', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '用户未登录', !->
    xiaodong-info= {uid: 'uid-1', logged-in: false, urls: ['http://www.baidu.com']}
    can '用户创建群聊， 返回错误信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'create-group-chat-room', group-chat-schema
      data.should.have.property 'result', 'failed'
      done!

  describe '用户已登录', !->
    before-each !(done)->
      xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
      baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
      wangyu-info = {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
      weike-info = {uid: 'uid-4', logged-in: true, urls: ['http://www.some.com']}
      (xiaodong-channels) <-! socket-helper.get-client xiaodong-info
      (baixin-channels) <-! socket-helper.get-client baixin-info
      (wangyu-channels) <-! socket-helper.get-client wangyu-info
      (weike-channels) <-! socket-helper.get-client weike-info
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      weike:= weike-channels
      done!

    can '小东创建群聊，返回正确信息', !(done)->
      (data) <-! xiaodong.chats-channel.emit 'create-group-chat-room', group-chat-schema
      data.should.have.property 'result', 'success'
      data.should.have.property 'chatRoom'
      data.chat-room.should.have.property '_id'
      data.chat-room.should.have.property 'name'
      data.chat-room.should.have.property 'signature'
      data.chat-room.should.have.property 'avatar'
      data.chat-room.should.have.property 'joins'
      data.chat-room.joins[0].should.have.property '_id'
      data.chat-room.joins[0].should.have.property 'username'
      data.chat-room.joins[0].should.have.property 'gender'
      data.chat-room.joins[0].should.have.property 'email'
      data.chat-room.joins[0].should.have.property 'signature'
      data.chat-room.joins[0].should.have.property 'avatar'
      done!

    can '小东创建群聊， initial-members中的用户和已有的群聊相同， 仍然能够创建成功', !(done)->
      (data) <-! xiaodong.chats-channel.emit 'create-group-chat-room', group-chat-schema <<< {initial-members: ['uid-2', 'uid-3']}
      data.should.have.property 'result', 'success'
      data.should.have.property 'chatRoom'
      data.chat-room.should.have.property '_id'
      data.chat-room._id.should.not.eql 'cid-2'
      data.chat-room.should.have.property 'name'
      data.chat-room.should.have.property 'signature'
      data.chat-room.should.have.property 'avatar'
      data.chat-room.should.have.property 'joins'
      data.chat-room.joins[0].should.have.property '_id'
      data.chat-room.joins[0].should.have.property 'username'
      data.chat-room.joins[0].should.have.property 'gender'
      data.chat-room.joins[0].should.have.property 'email'
      data.chat-room.joins[0].should.have.property 'signature'
      data.chat-room.joins[0].should.have.property 'avatar'
      done!

    can '小东创建群聊， 邀请了柏信和王瑜， 柏信收到邀请的系统消息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      baixin.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'cid'
        data.should.have.property 'type'
        data.should.have.property 'action', 'invite'
        data.should.have.property 'sendBy'
        data.should.have.property 'invitedUsers'
        data.should.have.property 'textContent'
        data.should.have.property 'createTime'
        waiter2!

      (data) <-! xiaodong.chats-channel.emit 'create-group-chat-room', group-chat-schema <<< {initial-members: ['uid-2', 'uid-3']}
      waiter1!

    can '小东创建群聊， 邀请了柏信和王瑜， 王瑜收到邀请的系统消息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      wangyu.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'cid'
        data.should.have.property 'type'
        data.should.have.property 'action', 'invite'
        data.should.have.property 'sendBy'
        data.should.have.property 'invitedUsers'
        data.should.have.property 'textContent'
        data.should.have.property 'createTime'
        waiter2!

      (data) <-! xiaodong.chats-channel.emit 'create-group-chat-room', group-chat-schema <<< {initial-members: ['uid-2', 'uid-3']}
      waiter1!
