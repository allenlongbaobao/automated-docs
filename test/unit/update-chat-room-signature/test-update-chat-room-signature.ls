# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//update-chat-room-signature/fixture/'

describe 'unit/ test -- update-chat-room-signature', !->
  xiaodong = baixin = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//update-chat-room-signature', ['users','chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '晓东更改群聊天室的签名', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      done!

    can '晓东更改签名， 收到服务器响应', !(done)->
      xiaodong.chats-channel.emit 'update-chat-room-signature', {cid: 'cid-1', signature: '这是一个新的签名'}, !(data)->
        data.should.have.property 'result', 'success'
        done!

    can '晓东更改签名，晓东收到push信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!

      xiaodong.chats-channel.on 'push-new-chat-room-signature', !(data)->
        data.should.fail '修改者收到了修改信息'

      xiaodong.chats-channel.emit 'update-chat-room-signature', {cid: 'cid-1', signature: '这是一个新的签名'}, !(data)->
        waiter1!

    can '晓东更改签名，柏信收到push信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      baixin.chats-channel.on 'push-new-chat-room-signature', !(data)->
        data.should.have.property 'cid', 'cid-1'
        data.update-user.should.have.property '_id', 'uid-1'
        waiter1!
      xiaodong.chats-channel.emit 'update-chat-room-signature', {cid: 'cid-1', signature: '这是一个新的签名'}, !(data)->
        waiter2!
