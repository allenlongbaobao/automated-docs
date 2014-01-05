# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//retrieve-chat-history/fixture/'

# 小东
# 柏信 
describe 'unit/ test -- retrieve-chat-history', !->
  xiaodong = baixin = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//retrieve-chat-history', ['users', 'chats', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东获取与柏信的聊天历史记录', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '小东获取三条历史聊天记录', !(done)->
      <-! set-timeout _, 1000
      reference-time = new Date() .to-string!
      xiaodong.chats-channel.emit 'retrieve-chat-history', {cid: 'cid-1', reference-time: reference-time, limit: 3}, !(data)->
        data.should.have.property 'result', 'success'
        data.chat-messages.should.with.length 3
        data.chat-messages.[0].should.have.property '_id'
        data.chat-messages.[0].should.have.property 'type'
        data.chat-messages.[0].should.have.property 'cid'
        data.chat-messages.[0].should.have.property 'atUsers'
        data.chat-messages.[0].should.have.property 'createTime'
        done!

