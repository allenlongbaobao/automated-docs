# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//retrieve-group-chats/fixture/'

describe 'unit/ test -- retrieve-group-chats', !->
  group-chat-message =
    cid: 'cid-2' # 聊天室id
    original-content-type: 'text'
    text-content: '召唤@wangyu 赶紧出现！！'
    voice-content: '/voice-message/cid-1/xxxx' # 这里是语音地址，在

  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//retrieve-group-chats', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '用户未登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: false, urls: ['www.some.com']}
    can '用户获取群聊信息， 返回错误信息', !(done)->
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (result) <-! xiaodong.chats-channel.emit 'retrieve-group-chats', {}
      result.should.have.property 'result', 'failed'
      done!

  describe '用户已登录', !->
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
    can '用户获取群聊信息， 返回正确信息', !(done)->
      (baixin) <-! socket-helper.get-client baixin-info
      (data) <-! baixin.chats-channel.emit 'send-group-chat-message', group-chat-message
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (result) <-! xiaodong.chats-channel.emit 'retrieve-group-chats', {}
      result.should.have.property 'result', 'success'
      result.should.have.property 'groupChats'
      result.group-chats[0].should.have.property '_id'
      result.group-chats[0].should.have.property 'type', 'group-chat'
      result.group-chats[0].should.have.property 'name'
      result.group-chats[0].should.have.property 'signature'
      result.group-chats[0].should.have.property 'avatar'
      result.group-chats[0].should.have.property 'joins'
      result.group-chats[0].should.have.property 'leaves'
      result.group-chats[0].should.have.property 'unreadUserChatMessagesCount'
      result.group-chats[0].should.have.property 'unreadSystemChatMessages'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property '_id'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property 'cid'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property 'type'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property 'action'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property 'textContent'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property 'createTime'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property 'sendBy'
      result.group-chats[0].unread-system-chat-messages[0].should.have.property 'invitedUsers'
      result.group-chats[0].unread-system-chat-messages[0].send-by.should.have.property '_id'
      result.group-chats[0].unread-system-chat-messages[0].send-by.should.have.property 'username'
      result.group-chats[0].unread-system-chat-messages[0].send-by.should.have.property 'gender'
      result.group-chats[0].unread-system-chat-messages[0].send-by.should.have.property 'email'
      result.group-chats[0].unread-system-chat-messages[0].send-by.should.have.property 'signature'
      result.group-chats[0].unread-system-chat-messages[0].send-by.should.have.property 'avatar'
      done!

