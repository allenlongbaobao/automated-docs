# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//retrieve-group-chat-room/fixture/'

describe 'unit/ test -- retrieve-group-chat-room', !->
  group-chat-message =
    cid: 'cid-2' # 聊天室id
    original-content-type: 'text'
    text-content: '召唤Shin 赶紧出现！！'
    voice-content: '/voice-message/cid-1/xxxx'

  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//retrieve-group-chat-room', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东未登录', !->
    xiaodong-info= {uid: 'uid-1', logged-in: false, urls: ['http://www.baidu.com']}
    can '用户获取群聊， 返回错误信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'retrieve-group-chat-room', {cid: 'cid-2'}
      data.should.have.property 'result', 'failed'
      done!

  describe '小东已登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
    can '小东获取已加入的群聊具体信息，得到正确结果', !(done)->
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! baixin.chats-channel.emit 'send-group-chat-message', group-chat-message
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'retrieve-group-chat-room', {cid: 'cid-2'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'chatRoom'
      data.chat-room.should.have.property '_id'
      data.chat-room.should.have.property 'type'
      data.chat-room.should.have.property 'name'
      data.chat-room.should.have.property 'signature'
      data.chat-room.should.have.property 'avatar'
      data.chat-room.should.have.property 'joins'
      data.chat-room.should.have.property 'unreadUserChatMessages'
      data.chat-room.joins[0].should.have.property '_id'
      data.chat-room.joins[0].should.have.property 'username'
      data.chat-room.joins[0].should.have.property 'gender'
      data.chat-room.joins[0].should.have.property 'email'
      data.chat-room.joins[0].should.have.property 'signature'
      data.chat-room.joins[0].should.have.property 'avatar'
      #data.chat-room.joins[0].should.have.property 'joinTime'
      data.chat-room.unread-user-chat-messages[0].should.have.property '_id'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'type'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'cid'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'originalContentType'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'voiceContent'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'atUsers'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'createTime'
      #data.chat-room.unread-user-chat-messages[0].should.have.property 'sendByMe'
      data.chat-room.unread-user-chat-messages[0].should.have.property 'sendBy'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property '_id'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'username'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'gender'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'email'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'signature'
      data.chat-room.unread-user-chat-messages[0].send-by.should.have.property 'avatar'
      done!

    can '小东获取未加入的群聊具体信息， 得到出错信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (data) <-! xiaodong.chats-channel.emit 'retrieve-group-chat-room', {cid: 'cid-3'}
      data.should.have.property 'result', 'failed'
      done!

