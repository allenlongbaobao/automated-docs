# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/create-private-chat-room/fixture/'

describe 'unit test -- create-private-chat-room', !->
  private-chat-message =
    cid: 'cid-1'
    original-content-type: 'text'
    text-content: '召唤 Shin 赶紧出现！！'
    voice-content: '/voice-message/cid-1/xxxx'

  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/create-private-chat-room', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '用户未登录', !->
    xiaodong-info= {uid: 'uid-1', logged-in: false, urls: ['http://www.baidu.com']}
    can '用户创建私聊， 返回错误信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-2'}
      data.should.have.property 'result', 'failed'
      done!

  describe '用户已登录', !->
    xiaodong-info= {uid: 'uid-1', logged-in: true, urls: ['http://www.baidu.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.baidu.com']}
    wangyu-info= {uid: 'uid-3', logged-in: true, urls: ['http://www.baidu.com']}
    can '小东和已经聊过天的柏信聊天', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! baixin.chats-channel.emit 'send-private-chat-message', private-chat-message
      <-! set-timeout _, 500
      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-2'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'chatRoom'
      data.chat-room.should.have.property '_id'
      data.chat-room.should.have.property 'type'
      data.chat-room.should.have.property 'joins'
      data.chat-room.should.have.property 'unreadUserChatMessages'
      data.chat-room.joins[0].should.have.property '_id'
      data.chat-room.joins[0].should.have.property 'username'
      data.chat-room.joins[0].should.have.property 'email'
      data.chat-room.joins[0].should.have.property 'gender'
      data.chat-room.joins[0].should.have.property 'avatar'
      data.chat-room.unread-user-chat-messages[0].should.have.property '_id'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'type'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'cid'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'originalContentType'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'textContent'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'voiceContent'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'createTime'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'sendBy'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property '_id'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'username'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'gender'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'email'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'signature'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'avatar'
      done!

    can '小东和已经聊过天的柏信发起聊天并发送信息， 收到系统正确响应', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-2'}
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      data.should.have.property 'result', 'success'
      done!

    can '小东和已经聊过天的柏信发起聊天并发送信息， 柏信能够收到信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info

      baixin.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid', 'cid-1'
        waiter1!

      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-2'}
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      waiter2!

    can '小东向柏信发起聊天，之后， 柏信向小东发起聊天， 小东发送信息， 柏信收到', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info

      baixin.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid', 'cid-1'
        waiter1!

      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-2'}
      (data) <-! baixin.chats-channel.emit 'create-private-chat-room', {uid: 'uid-1'}
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      waiter2!

    can '小东向柏信发起聊天，之后， 柏信向小东发起聊天， 柏信发送信息， 小东收到', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (baixin) <-! socket-helper.get-client baixin-info

      xiaodong.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid', 'cid-1'
        waiter1!

      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-2'}
      (data) <-! baixin.chats-channel.emit 'create-private-chat-room', {uid: 'uid-1'}
      (data) <-! baixin.chats-channel.emit 'send-private-chat-message', private-chat-message
      waiter2!

    can '小东和未曾聊过天的王瑜聊天', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-3'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'chatRoom'
      data.chat-room.should.have.property '_id'
      data.chat-room.should.have.property 'type'
      data.chat-room.should.have.property 'joins'
      data.chat-room.should.have.property 'unreadUserChatMessages'
      data.chat-room.joins[0].should.have.property '_id'
      data.chat-room.joins[0].should.have.property 'username'
      data.chat-room.joins[0].should.have.property 'email'
      data.chat-room.joins[0].should.have.property 'gender'
      data.chat-room.joins[0].should.have.property 'avatar'
      done!

    can '小东向王瑜发起聊天， 并发送信息， 收到系统正确响应', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info
      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-3'}
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      data.should.have.property 'result', 'success'
      done!

    can '小东向王瑜发起聊天， 并发送信息，王瑜收到信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      cid = null

      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info

      wangyu.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid'
        waiter1!

      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-3'}
      cid := data.chat-room._id
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', {cid: cid, original-content-type: 'text' , text-content: '召唤 Shin 赶紧出现！！', voice-content: '/voice-message/cid-1/xxxx'}
      waiter2!

    can '小东向王瑜发起聊天， 之后， 王瑜向小东发起聊天， 小东发送信息，王瑜收到', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info
      cid = ''

      wangyu.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid'
        waiter1!

      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-3'}
      (data) <-! wangyu.chats-channel.emit 'create-private-chat-room', {uid: 'uid-1'}
      cid := data.chat-room._id
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', {cid: cid, original-content-type: 'text' , text-content: '召唤 Shin 赶紧出现！！', voice-content: '/voice-message/cid-1/xxxx'}
      waiter2!


    can '小东向王瑜发起聊天， 之后，王瑜向小东发起聊天， 王瑜发送信息， 小东收到', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info
      cid = ''

      xiaodong.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid'
        waiter1!

      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-3'}
      (data) <-! wangyu.chats-channel.emit 'create-private-chat-room', {uid: 'uid-1'}
      cid := data.chat-room._id
      (data) <-! wangyu.chats-channel.emit 'send-private-chat-message', {cid: cid, original-content-type: 'text' , text-content: '召唤 Shin 赶紧出现！！', voice-content: '/voice-message/cid-1/xxxx'}
      waiter2!

    can '小东和自己聊天， 返回错误信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', {uid: 'uid-1'}
      data.should.have.property 'result', 'failed'
      done!

