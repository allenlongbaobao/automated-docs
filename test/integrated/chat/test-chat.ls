# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/chat/fixture/'

describe 'integrated/ test -- chat', !->
  xiaodong = baixin = wangyu = weike = null
  cid-xiaodong = cid-wangyu = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/chat', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '聊天集成测试', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
      (weike-channels) <-! socket-helper.get-client {uid: 'uid-4', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      weike := weike-channels
      request-data-xiaodong = {uid: 'uid-2'}
      request-data-wangyu = {uid: 'uid-4'}

      (data) <-! xiaodong.chats-channel.emit 'create-private-chat-room', request-data-xiaodong
      cid-xiaodong := data.chat-room._id

      (data) <-! wangyu.chats-channel.emit 'create-private-chat-room', request-data-wangyu
      cid-wangyu := data.chat-room._id
      done!

    can '小东向柏信发起聊天， 两人互相发信息, 王瑜向伟科发起聊天， 两人互相发信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!
      waiter4 = waiter.add-waiting-function!
      message-xiaodong = {cid: cid-xiaodong, original-content-type: 'text', text-content: 'hello baixin', voice-content: ''}
      message-wangyu = {cid: cid-wangyu, original-content-type: 'text', text-content: 'hello weike', voice-content: ''}

      baixin.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid', cid-xiaodong
        waiter4!

      weike.chats-channel.on 'push-new-chat-message', !(data)->
        data.should.have.property 'cid', cid-wangyu
        waiter3!

      xiaodong.chats-channel.emit 'send-private-chat-message', message-xiaodong, !(data)->
        waiter1!

      wangyu.chats-channel.emit 'send-private-chat-message', message-wangyu, !(data)->
        waiter2!

