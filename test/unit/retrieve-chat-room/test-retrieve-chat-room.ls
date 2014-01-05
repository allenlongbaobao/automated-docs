# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
#FIXTURE_PATH = 'unit//retrieve-chat-room/fixture/'
#
## 小东
## 柏信
## 小东获取私聊聊天室
## 柏信获取群聊聊天室
#describe 'unit/ test -- retrieve-chat-room', !->
#  xiaodong = baixin = null
#  before-each !(done)->
#    <-! server.start
#    socket-helper.clear-all-client-sockets!
#    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
#    utils.clean-db-and-load-fixture 'unit//retrieve-chat-room', ['users', 'chats'], done
#
#  after-each !(done)->
#    socket-helper.Sockets-destroyer.get!.destroy-all!
#    server.shutdown!
#    done!
#
#  describe '小东, 柏信获取聊天室', !->
#    before-each !(done)->
#      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
#      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
#      xiaodong := xiaodong-channels
#      baixin := baixin-channels
#      done!
#
#    can '小东获取私聊聊天室， 得到服务器响应', !(done)->
#      xiaodong.chats-channel.emit 'retrieve-chat-room', {cid: 'cid-1'}, !(data)->
#        data.chat-room.should.have.property 'type', 'private-chat'
#        data.chat-room.should.have.property '_id', 'cid-1'
#        data.chat-room.should.have.property 'name'
#        data.chat-room.should.have.property 'avatar'
#        data.chat-room.should.have.property 'signature'
#        data.chat-room.should.have.property 'joins'
#        #data.chat-room.should.not.have.property 'joins'
#        done!
#
#    can '柏信获取群聊天室， 得到服务器响应', !(done)->
#      baixin.chats-channel.emit 'retrieve-chat-room', {cid: 'cid-2'}, !(data)->
#        data.chat-room.should.have.property 'type', 'group-chat'
#        data.chat-room.should.have.property 'name', '聊天室1'
#        data.chat-room.should.have.property 'signature', '@+ is wonderful!'
#        data.chat-room.should.have.property 'avatar'
#        data.chat-room.should.have.property 'joins'
#        #data.chat-room.should.not.have.property 'joins'
#        done!
#
