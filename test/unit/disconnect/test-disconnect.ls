# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/disconnect/fixture/'

describe 'unit test -- disconnect', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/disconnect', ['users', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '能够通知同一个location的其他用户', !(done)->
    waiter = new utils.All-done-waiter done
    waiter1 = waiter.add-waiting-function!
    waiter2 = waiter.add-waiting-function!
    (creator) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1', urls: ['http://www.some.com', 'http://www.not-in-database.com']}
    (observer1) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.not-in-database.com']}
    (observer2) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}

    observer1.locations-channel.on 'push-active-user-updated', !(data)->
      data.should.have.property 'location'
      data.location.should.have.property 'id', ''
      data.location.should.have.property 'url', 'http://www.not-in-database.com'
      data.should.have.property 'user'
      data.user.should.have.property '_id', 'uid-1'
      data.should.have.property 'action', 'leave'
      waiter1!

    observer2.locations-channel.on 'push-active-user-updated', !(data)->
      data.should.have.property 'location'
      data.location.should.have.property 'id', 'lid-1'
      data.location.should.have.property 'url', ''
      data.should.have.property 'user'
      data.user.should.have.property '_id', 'uid-1'
      data.should.have.property 'action', 'leave'
      waiter2!

    creator.default-channel.socket.disconnect!

  can '能够通知在用户曾经参与的location的其他用户', !(done)->
    (creator) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
    (observer1) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}
    (observer2) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.not-in-database.com']}

    observer1.locations-channel.on 'push-attended-user-updated', !(data)->
      data.should.have.property 'location'
      data.location.should.have.property 'id', 'lid-1'
      data.should.have.property 'user'
      data.user.should.have.property '_id', 'uid-1'
      data.user.should.have.property 'status', 'offline'
      <-! set-timeout _, 100 # 确保有足够时间验证 observer2 是否收到了消息
      done!

    observer2.locations-channel. on 'push-attended-user-updated', !(data)->
      data.should.fail '非参与location的其他用户收到了消息推送'

    creator.default-channel.socket.disconnect!
