# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/locations-channel-initial/fixture/'

describe 'integrated test -- locations-channel-initial', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/locations-channel-initial', ['users', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  xiaodong-info = {logged-in: true, uid: 'uid-1', urls: ['http://www.some.com']}
  baixin-info = {logged-in: true, uid: 'uid-2', urls: ['http://www.some.com']}
  describe '不管是否登录', !->
    client = initial-data = null

    before-each !(done)->
      (channels, response-data) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com', 'http://www.not-in-database.com']}
      client := channels
      initial-data := response-data
      done!

    can '能返回当前的位置信息', !(done)->
      initial-data.locations-channel.should.have.property 'locations'
      initial-data.locations-channel.should.have.property 'inexistenceLocations'
      initial-data.locations-channel.inexistence-locations.should.include 'http://www.not-in-database.com'
      initial-data.locations-channel.locations.length.should.eql 1
      initial-data.locations-channel.locations.0.urls.should.include 'http://www.some.com'
      done!

    can '能够加入到不存在数据的页面的room中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      client.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'url', 'http://www.not-in-database.com'
        data.location.should.have.property 'id', ''
        data.should.have.property 'user'
        data.should.have.property 'action', 'join'
        data.user.should.have.property '_id', 'uid-1'
        waiter1!
      socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['http://www.not-in-database.com']}, !(creator)->
        waiter2!

    can '能够加入到已存在数据的页面的room中', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      client.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.location.should.have.property 'url', ''
        data.should.have.property 'user'
        data.should.have.property 'action', 'join'
        data.user.should.have.property '_id', 'uid-1'
        waiter1!
      socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}, !(creator)->
        waiter2!

  describe '对于已经登录的情况', !->

    can '能够通知同个location的其他用户', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (baixin) <-! socket-helper.get-client baixin-info
      baixin.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.should.have.property 'user'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username', 'xiaodong'
        data.should.have.property 'action', 'join'
        waiter1!
      socket-helper.get-client xiaodong-info, !(xiaodong)->
        waiter2!

    can '能够通知在用户曾经参与过的location的其他用户', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (baixin) <-! socket-helper.get-client baixin-info
      baixin.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.should.have.property 'user'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'username', 'xiaodong'
        data.user.should.have.property 'status', 'online'
        waiter1!
      socket-helper.get-client xiaodong-info, !(xiaodong)->
        waiter2!
