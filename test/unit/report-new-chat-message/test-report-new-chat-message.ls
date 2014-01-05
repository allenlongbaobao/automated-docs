# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//report-new-chat-message/fixture/'

# 小东 # 柏信
# 王瑜
# 小东和柏信在chat-1 私聊, 发送了一条信息,@ 了王瑜
# 柏信收到该消息推送, report后, 2秒后,登出, 再2秒后重新登录, 接收到的初始化数据中, 该聊天室中的未读消息为0
# 王瑜收到该消息推送, report后, 数据库中, 用户的该聊天室的status为active
# 同时， 小东和柏信收到王瑜同意加入讨论组的系统消息推送

describe 'unit/ test -- report-new-chat-message', !->
  xiaodong = baixin = wangyu = null
  private-chat-message =
    cid: 'cid-1'
    original-content-type: 'text'
    text-content: '召唤@王瑜 赶紧出现！！'
    voice-content: '/voice-message/cid-1/xxxx'
  new-chat-room-id = ''

  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//report-new-chat-message', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  # 私聊信息
  describe '小东在和柏信私聊中发送一条信息, @ 王瑜', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      done!

    can '柏信收到消息提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!

      xiaodong.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.fail '小东不能收到推送信息'

      baixin.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'sendByMe', false
        data.should.have.property 'cid', 'cid-1'
        data.send-by.should.have.property '_id', 'uid-1'
        waiter3!

      baixin.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property 'type', 'chat-msg'
        data.should.have.property 'action', 'invite'
        waiter2!

      xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message, !(data)->
        waiter1!

    can '王瑜收到消息提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      wangyu.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.fail '王玉不能收到这个消息'

      wangyu.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property 'type', 'chat-msg'
        data.should.have.property 'action', 'invite'
        waiter1!

      xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message, !(data)->
        waiter2!

  describe 'report时， 传递错误的cid, 系统提示错误', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message, !(data)->
        done!

    can  '柏信report时，cid错误， 服务器返回错误信息', !(done)->
      (data)<-! baixin.chats-channel.emit 'report-new-chat-message', {cid: 'error-cid', type: 'private-chat'}
      data.should.have.property 'result', 'failed'
      done!

  describe '不 report群聊， 再次登录', !->
    before-each !(done)->
      cid = null
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['www.some.come']}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true, urls: ['www.some.come']}
      xiaodong := xiaodong-channels
      wangyu := wangyu-channels
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      (data) <-! wangyu.users-channel.emit 'logout', {token: 'uid-3'}
      done!

    can '王瑜登出, 再次登录, 检查到该聊天室有一条未读消息', !(done)->
      (data) <-! wangyu.users-channel.emit 'login',{token: 'uid-3'}
      (data) <-! wangyu.chats-channel.emit 'retrieve-group-chats', {}
      new-group-chat = _.find data.group-chats, (chat)-> chat._id isnt 'cid-2'
      new-group-chat.should.have.property 'unreadSystemChatMessages' .with.length-of 1
      done!

  describe 'report群聊后， 再次登录', !->
    before-each !(done)->
      cid = null
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['www.some.com']}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true, urls: ['www.some.com']}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true, urls: ['www.some.com']}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      baixin.chats-channel.on 'push-system-chat-message', !(data)->
        cid := data.cid
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      <-! set-timeout _, 500
      (data) <-! baixin.chats-channel.emit 'report-new-chat-message', {cid: cid, type: 'group-chat'}
      (data) <-! baixin.users-channel.emit 'logout', {token: 'uid-2'}
      done!

    can '柏信report群聊, 登出, 再次登录, 该聊天室中没有未读消息', !(done)->
      xiaodong.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.fail '小东收到了柏信report的系统消息推送'

      (data) <-! baixin.users-channel.emit 'login', {token: 'uid-2'}
      (data) <-! baixin.chats-channel.emit 'retrieve-group-chats', {}
      data.should.have.property 'result', 'success'
      data.group-chats[0].should.have.property 'unreadSystemChatMessages' .with.length-of 0
      done!


  describe '被邀请者report群聊后， 其他人收到系统消息推送', !(done)->
    cid = null
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      wangyu.chats-channel.on 'push-system-chat-message', !(data)->
        cid := data.cid
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      <-! set-timeout _, 200
      done!

    can '王瑜接受邀请', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!

      baixin.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property 'action', 'accept'
        waiter3!

      xiaodong.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property 'action', 'accept'
        waiter2!

      wangyu.chats-channel.emit 'report-new-chat-message', {cid: cid, type: 'group-chat'}, !(data)->
        waiter1!

  describe 'report群聊后， 再次登录', !->
    before-each !(done)->
      cid = null
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['www.some.come']}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true, urls: ['www.some.come']}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true, urls: ['www.some.come']}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      wangyu.chats-channel.on 'push-system-chat-message', !(data)->
        cid := data.cid
      (data) <-! xiaodong.chats-channel.emit 'send-private-chat-message', private-chat-message
      <-! set-timeout _, 300
      (data) <-! wangyu.chats-channel.emit 'report-new-chat-message', {cid: cid, type: 'group-chat'}
      (data) <-! wangyu.users-channel.emit 'logout', {token: 'uid-3'}
      done!

    can '王瑜report, 登出, 再次登录, 该聊天室没有未读消息', !(done)->
      (data) <-! wangyu.users-channel.emit 'login', {token: 'uid-3'}
      (data) <-! wangyu.chats-channel.emit 'retrieve-group-chats', {}
      data.should.have.property 'result', 'success'
      data.group-chats[0].should.have.property 'unreadUserChatMessagesCount',0
      done!

