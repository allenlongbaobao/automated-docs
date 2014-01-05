# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//retrieve-private-chats-with-unread-messages/fixture/'

# xiaodong -- uid-1
# baixin   -- uid-2
# wangyu   -- uid-3
# 小东和柏信在cid-2中
# 小东和王瑜在cid-3中
describe 'unit/ test -- retrieve-private-chats-with-unread-messages', !->
  private-chat-message =
    cid: 'cid-2'
    original-content-type: 'text'
    text-content: '召唤 Shin 赶紧出现！！'
    voice-content: '/voice-message/cid-1/xxxx'

  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//retrieve-private-chats-with-unread-messages', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东未登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: false}
    can '小东获取有未读消息的私聊， 得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'retrieve-private-chats-with-unread-messages', {}
      data.should.have.property 'result', "failed"
      done!

  describe '小东已登录', !->
    xiaodong = baixin = wangyu = null
    before-each !(done)->
      xiaodong-info = {uid: 'uid-1', logged-in: true}
      baixin-info = {uid: 'uid-2', logged-in: true}
      wangyu-info = {uid: 'uid-3', logged-in: true}
      (xiaodong-channels) <-! socket-helper.get-client xiaodong-info
      (baixin-channels) <-! socket-helper.get-client baixin-info
      (wangyu-channels) <-! socket-helper.get-client wangyu-info
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      done!

    can '小东获取有未读消息的私聊，得到正确响应，私聊数为0', !(done)->
      (data) <-! xiaodong.chats-channel.emit 'retrieve-private-chats-with-unread-messages', {}
      data.should.have.property 'result', "success"
      data.should.have.property 'privateChats' .with.length-of 0
      done!

    can '柏信在cid-2中发送信息， 小东获取有未读信息的私聊， 私聊数为1', !(done)->
      (data) <-! baixin.chats-channel.emit 'send-private-chat-message', private-chat-message
      <-! set-timeout _, 500
      (data) <-! xiaodong.chats-channel.emit 'retrieve-private-chats-with-unread-messages', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'privateChats' .with.length-of 1
      data.private-chats[0].should.have.property '_id'
      data.private-chats[0].should.have.property 'type'
      data.private-chats[0].should.have.property 'joins' .with.length-of 2
      data.private-chats[0].should.have.property 'unreadUserChatMessages' .with.length-of 1
      done!

    can '柏信在cid-2中发送信息， 王瑜在cid-3中发送信息， 小东获取有未读消息的私聊， 私聊数为2', !(done)->
      (data) <-! baixin.chats-channel.emit 'send-private-chat-message', private-chat-message
      (data) <-! wangyu.chats-channel.emit 'send-private-chat-message', private-chat-message <<< {cid: 'cid-3'}
      <-! set-timeout _, 500
      (data) <-! xiaodong.chats-channel.emit 'retrieve-private-chats-with-unread-messages', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'privateChats' .with.length-of 2
      data.private-chats[0].should.have.property '_id'
      data.private-chats[0].should.have.property 'type'
      data.private-chats[0].should.have.property 'joins' .with.length-of 2
      data.private-chats[0].should.have.property 'unreadUserChatMessages' .with.length-of 1
      data.private-chats[1].should.have.property 'unreadUserChatMessages' .with.length-of 1
      done!
