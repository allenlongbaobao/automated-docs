# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'unit//update-chat-room-name/fixture/'

# 小东
# 柏信
describe 'unit/ test -- update-chat-room-name', !->
  xiaodong = baixin = wangyu = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//update-chat-room-name', ['users', 'chats'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东更改群聊天室cid-2的名称', !->
    before-each (done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (baixin-channels) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (wangyu-channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      done!

    can '小东更改聊天室，收到服务器响应', !(done)->
      xiaodong.chats-channel.emit 'update-chat-room-name', {cid: 'cid-2', name: '我是王瑜'}, !(data)->
        data.should.have.property 'result', 'success'
        done!

    can '小东更改聊天室名称，小东收到push-new-chat-room-name', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!

      xiaodong.chats-channel.on 'push-new-chat-room-name', !(data)->
        data.should.fail '修改者收到了修改信息'

      xiaodong.chats-channel.emit 'update-chat-room-name', {cid: 'cid-2', name: '我是王瑜'}, !(data)->
        waiter1!

    can '小东更改聊天室名称，柏信收到push-new-chat-room-name', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      baixin.chats-channel.on 'push-new-chat-room-name', !(data)->
        data.should.have.property 'cid', 'cid-2'
        data.should.have.property 'name', '我是王瑜'
        data.update-user.should.have.property '_id', 'uid-1'
        waiter2!

      xiaodong.chats-channel.emit 'update-chat-room-name', {cid: 'cid-2', name: '我是王瑜'}, !(data)->
        waiter1!

    can '小东更改聊天室名称， 王瑜收到push-new-chat-room-name', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!

      wangyu.chats-channel.on 'push-new-chat-room-name', !(data)->
        data.should.have.property 'cid', 'cid-2'
        data.should.have.property 'name', '我是王瑜'
        data.update-user.should.have.property '_id', 'uid-1'
        waiter2!


      xiaodong.chats-channel.emit 'update-chat-room-name', {cid: 'cid-2', name: '我是王瑜'}, !(data)->
        waiter1!

