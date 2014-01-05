# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//leave-group-chat-room/fixture/'


# 小东
# 柏信
# 王瑜
# 小东@了王瑜后， 他们都在cid-1中
describe 'unit/ test -- leave-group-chat-room', !->
  xiaodong = baixin = wangyu = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//leave-group-chat-room', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '王瑜拒绝接受小东的邀请 -- 离开cid-1', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['www.some.com']}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true, urls: ['www.some.com']}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true, urls: ['www.some.com']}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      baixin.chats-channel.on 'push-system-chat-message', !(data)->
      (data) <-! xiaodong.chats-channel.emit 'send-group-chat-message', {cid: 'cid-1', original-content-type: 'text', voice-content: '', text-content: '@王瑜 快点出现吧'}
      done!

    can '王瑜登录，retrieve-group-chats返回数据中群聊天室有数据', !(done)->
      (data) <-! wangyu.users-channel.emit 'logout', {token: 'uid-3'}
      (data) <-! wangyu.users-channel.emit 'login', {token: 'uid-3'}
      (data) <-! wangyu.chats-channel.emit 'retrieve-group-chats', {}
      data.group-chats[0].should.have.property 'unreadSystemChatMessages' .with.length 1
      done!

    can '王瑜拒绝邀请， 离开cid-1, 收到服务器返回结果', !(done)->
      wangyu.chats-channel.emit 'leave-group-chat-room', {cid: 'cid-1'}, !(data)->
        data.should.have.property 'result', 'success'
        done!

    can '王瑜拒绝聊天室cid的邀请后， 登出， 再登录， chats-channel-restored 的返回数据中没有该聊天室', !(done)->
      (data) <-! wangyu.chats-channel.emit 'leave-group-chat-room', {cid: 'cid-1'}
      (data) <-! wangyu.users-channel.emit 'logout', {token: 'uid-3'}
      (data) <-! wangyu.users-channel.emit 'login', {token: 'uid-3'}
      (data) <-! wangyu.chats-channel.emit 'retrieve-group-chats', {}
      data.should.have.property 'result', 'success'
      data.group-chats.should.eql []
      done!

    can '王瑜拒绝聊天室cid的邀请后，柏信收到拒绝系统消息提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!
      baixin.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property 'action', 'reject'
        data.should.have.property 'type', 'chat-msg'
        waiter2!

      xiaodong.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property 'action', 'reject'
        data.should.have.property 'type', 'chat-msg'
        waiter3!

      wangyu.chats-channel.emit 'leave-group-chat-room', {cid: 'cid-1'}, !(data)->
        waiter1!

  describe '王瑜拒绝后， 柏信离开了该聊天室， cid-1解散， 小东接到系统消息', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      done!

    can '在群聊天室2 中， 成员只有柏信和小东，柏信离开， 小东收到聊天室解散的系统提示', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      xiaodong.chats-channel.on 'push-system-chat-message', !(data)->
        data.should.have.property 'action', 'disband'
        waiter2!

      baixin.chats-channel.emit 'leave-group-chat-room', {cid: 'cid-1'}, !(data)->
        waiter1!

