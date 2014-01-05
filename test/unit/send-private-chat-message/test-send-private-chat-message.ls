# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//send-private-chat-message/fixture/'

# 小东 -- uid-1
# 柏信 -- uid-2
# 王瑜 -- uid-3
# 伟科 -- uid-4
describe 'unit/ test -- send-private-chat-message', !->
  xiaodong = baixin = wangyu = weike = null
  private-chat-message =
    cid: 'cid-1'
    original-content-type: 'text'
    text-content: '召唤 Shin 赶紧出现！！'
    voice-content: '/voice-message/cid-1/xxxx'

  private-chat-message-at-users =
    cid: 'cid-1'
    original-content-type: 'text'
    text-content: '召唤@wangyu @weike 赶紧出现！！'
    voice-content: '/voice-message/cid-1/xxxx'

  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//send-private-chat-message', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东未登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: false, urls: ['http://www.some.com']}
    can '小东发送私聊信息，返回错误结果', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      data.should.have.property 'result', 'failed'
      done!

  describe '小东已登录', !->
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

    can '小东发送私聊信息， 返回正确结果', !(done)->
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      data.should.have.property 'result', 'success'
      data.should.have.property 'newChatMessage'
      data.new-chat-message.should.have.property '_id'
      data.new-chat-message.should.have.property 'type'
      data.should.not.have.property 'pushType'
      data.should.not.have.property 'chatType'
      data.new-chat-message.should.have.property 'cid'
      data.new-chat-message.should.have.property 'originalContentType'
      data.new-chat-message.should.have.property 'textContent'
      data.new-chat-message.should.have.property 'voiceContent'
      data.new-chat-message.should.have.property 'createTime'
      data.new-chat-message.should.have.property 'sendByMe', true
      data.new-chat-message.should.not.have.property 'sendBy'
      done!

    can '柏信发送私聊信息， 返回正确结果', !(done)->
      (data) <-! baixin.chats-channel.emit 'send-private-chat-message', private-chat-message
      data.should.have.property 'result', 'success'
      data.should.have.property 'newChatMessage'
      data.new-chat-message.should.have.property '_id'
      data.new-chat-message.should.have.property 'type'
      data.should.not.have.property 'pushType'
      data.should.not.have.property 'chatType'
      data.new-chat-message.should.have.property 'cid'
      data.new-chat-message.should.have.property 'originalContentType'
      data.new-chat-message.should.have.property 'textContent'
      data.new-chat-message.should.have.property 'voiceContent'
      data.new-chat-message.should.have.property 'createTime'
      data.new-chat-message.should.have.property 'sendByMe', true
      data.new-chat-message.should.not.have.property 'sendBy'
      done!

    can '小东发送私聊信息，柏信收到消息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      baixin.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'type'
        data.should.have.property 'pushType', 'personal-msg'
        data.should.have.property 'chatType', 'private-chat'
        data.should.have.property 'cid'
        data.should.have.property 'originalContentType'
        data.should.have.property 'textContent'
        data.should.have.property 'voiceContent'
        data.should.have.property 'createTime'
        data.should.have.property 'sendByMe', false
        data.should.have.property 'sendBy'
        data.send-by.should.have.property '_id'
        data.send-by.should.have.property 'username'
        data.send-by.should.have.property 'gender'
        data.send-by.should.have.property 'email'
        data.send-by.should.have.property 'signature'
        data.send-by.should.have.property 'avatar'
        waiter1!

      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      waiter2!

    can '柏信发送私聊信息， 小东能收到消息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'type'
        data.should.have.property 'pushType', 'personal-msg'
        data.should.have.property 'chatType', 'private-chat'
        data.should.have.property 'cid'
        data.should.have.property 'originalContentType'
        data.should.have.property 'textContent'
        data.should.have.property 'voiceContent'
        data.should.have.property 'createTime'
        data.should.have.property 'sendByMe', false
        data.should.have.property 'sendBy'
        data.send-by.should.have.property '_id'
        data.send-by.should.have.property 'username'
        data.send-by.should.have.property 'gender'
        data.send-by.should.have.property 'email'
        data.send-by.should.have.property 'signature'
        data.send-by.should.have.property 'avatar'
        waiter1!

      (data) <-! baixin.chats-channel.emit 'send-private-chat-message', private-chat-message
      waiter2!

    can '小东给柏信发送私聊， @了王瑜和伟可， 收到新建群聊', !(done)->
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message-at-users
      data.should.have.property 'result', 'success'
      done!

    can '小东给柏信发送私聊， @了王瑜和伟可， 王瑜收到邀请系统信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      wangyu.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'cid'
        data.should.have.property 'type'
        data.should.have.property 'pushType', 'system-msg'
        data.should.have.property 'chatType', 'group-chat'
        data.should.have.property 'action', 'invite'
        data.should.have.property 'sendBy'
        data.should.have.property 'invitedUsers'
        data.should.have.property 'textContent'
        data.should.have.property 'createTime'
        waiter2!

      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message-at-users
      waiter1!

    can '小东给柏信发送私聊， @了王瑜和伟可， 伟可收到邀请系统信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      weike.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'cid'
        data.should.have.property 'type'
        data.should.have.property 'pushType', 'system-msg'
        data.should.have.property 'chatType', 'group-chat'
        data.should.have.property 'action', 'invite'
        data.should.have.property 'sendBy'
        data.should.have.property 'invitedUsers'
        data.should.have.property 'textContent'
        data.should.have.property 'createTime'
        waiter2!

      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message-at-users
      waiter1!


    can '小东给柏信发送私聊， @了王瑜和伟可， 柏信收到邀请王瑜的系统信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      baixin.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'cid'
        data.should.have.property 'type'
        data.should.have.property 'pushType', 'system-msg'
        data.should.have.property 'chatType', 'group-chat'
        data.should.have.property 'action', 'invite'
        data.should.have.property 'sendBy'
        data.should.have.property 'invitedUsers'
        data.should.have.property 'textContent'
        data.should.have.property 'createTime'
        waiter2!

      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message-at-users
      waiter1!

    can '小东给柏信发送私聊， @了王瑜和伟可， 小东自己也能收到邀请系统消息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'cid'
        data.should.have.property 'type'
        data.should.have.property 'pushType', 'system-msg'
        data.should.have.property 'chatType', 'group-chat'
        data.should.have.property 'action', 'invite'
        data.should.have.property 'sendBy'
        data.should.have.property 'invitedUsers'
        data.should.have.property 'textContent'
        data.should.have.property 'createTime'
        waiter2!

      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message-at-users
      waiter1!
