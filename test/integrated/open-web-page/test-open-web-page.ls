# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/open-web-page/fixture/'

request-create-a-new-web-interesting-point-on-a-new-url = utils.load-fixture FIXTURE_PATH + 'request-create-a-new-web-interesting-point-on-a-new-url'

describe 'integrated test -- open-web-page', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/open-web-page', ['users', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.locations-channel.emit 'open-web-page', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '若打开的页面无法找到数据', !->

    can '能够返回空对象', !(done)->
      (channels) <-! socket-helper.get-client {logged-in: false}
      (data) <-! channels.locations-channel.emit 'open-web-page', {url: 'http://www.not-in-database.com'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'openedWebPage'
      data.opened-web-page.should.eql {}
      done!

    can '其他用户在此页面中新建兴趣点，能够收到location更新消息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (observer) <-! socket-helper.get-client {logged-in: false}
      (creator) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      observer.locations-channel.on 'push-location-updated', !(data)->
        data.should.have.property '_id'
        data.should.have.property 'type', 'web'
        data.should.have.property 'urls'
        data.urls.should.include 'http://www.not-in-database.com'
        waiter1!
      creator.locations-channel.on 'ask-location-internality', !(data)->
        creator.locations-channel.emit 'answer-location-internality', {lid: data.lid, result: 'success', is-internal: false}, !(data)->
      (data) <-! observer.locations-channel.emit 'open-web-page', {url: 'http://www.not-in-database.com'}
      request-create-a-new-web-interesting-point-on-a-new-url.within-location <<< {url: 'http://www.not-in-database.com'}
      (data) <-! creator.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url
      waiter2!

    can '通知在同一个location的其他用户', !(done)->
      (creator)<-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (observer) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.not-in-database.com']}
      observer.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', ''
        data.location.should.have.property 'url', 'http://www.not-in-database.com'
        data.should.have.property 'user'
        data.user.should.have.property '_id', 'uid-1'
        data.user.should.have.property 'username', 'xiaodong'
        data.should.have.property 'action', 'join'
        done!
      creator.locations-channel.emit 'open-web-page', {url: 'http://www.not-in-database.com'}, !(data)->
        data.should.have.property 'result', 'success'

  describe '若打开的页面能够找到数据', !->

    can '能够返回正确的信息', !(done)->
      (channels) <-! socket-helper.get-client {logged-in: false}
      (data) <-! channels.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'openedWebPage'
      data.opened-web-page.should.have.property '_id', 'lid-1'
      done!

    can '其他用户在此页面中新建兴趣点，能够收到兴趣点更新消息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (observer) <-! socket-helper.get-client {logged-in: false}
      (creator) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      observer.locations-channel.on 'push-interesting-point-updated', !(data)->
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedInterestingPoint'
        waiter1!
      (data) <-! observer.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
      request-create-a-new-web-interesting-point-on-a-new-url.within-location <<< {lid: data.opened-web-page._id, url: data.opened-web-page.urls[0]}
      (data) <-! creator.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point-on-a-new-url
      waiter2!

    can '通知在同一个location的其他用户', !(done)->
      (creator)<-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (observer) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}
      observer.locations-channel.on 'push-active-user-updated', !(data)->
        data.should.have.property 'location'
        data.location.should.have.property 'id', 'lid-1'
        data.location.should.have.property 'url', ''
        data.should.have.property 'user'
        data.user.should.have.property '_id', 'uid-1'
        data.user.should.have.property 'username', 'xiaodong'
        data.should.have.property 'action', 'join'
        done!
      creator.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}, !(data)->
        data.should.have.property 'result', 'success'

