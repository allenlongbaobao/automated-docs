# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/close-web-page/fixture/'

request-create-a-new-web-interesting-point = utils.load-fixture FIXTURE_PATH + 'request-create-a-new-web-interesting-point'
request-create-a-new-comment = type: 'ips-msg', original-content-type: 'text', text-content: 'asdkjf', voice-content: 'kasdfjksdjf', is-anonymous: false

describe 'integrated test -- close-web-page', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/close-web-page', ['users', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回错误信息', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.locations-channel.emit 'close-web-page', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '关闭没有打开过的页面，可以正常操作', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.locations-channel.emit 'close-web-page', {lid: '', url: 'http://www.not-open.com'}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    done!

  can '若是无数据的页面，可以正常关闭', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.locations-channel.emit 'open-web-page', {url: 'http://www.not-in-database.com'}
    (data) <-! channels.locations-channel.emit 'close-web-page', {lid: '', url: 'http://www.not-in-database.com'}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    done!

  can '若是有数据的页面，正常关闭后，不再接收到该页面的兴趣点更新消息', !(done)->
    (observer) <-! socket-helper.get-client {logged-in: false}
    (creator) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    observer.locations-channel.on 'push-interesting-point-updated', !(data)->
      data.should.fail '关闭了页面的用户收到了兴趣点更新消息'
    (data) <-! observer.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
    (data) <-! observer.locations-channel.emit 'close-web-page', {lid: data.opened-web-page._id, url: data.opened-web-page.urls[0]}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    (data) <-! creator.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
    <-! set-timeout _, 200 # 确保有足够的时间验证push-interesting-point-updated是否被触发
    done!

  can '能够通知同一个location的其他用户', !(done)->
    waiter = new utils.All-done-waiter done
    waiter1 = waiter.add-waiting-function!
    waiter2 = waiter.add-waiting-function!
    (observer) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}
    (creator) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}

    observer.locations-channel.on 'push-active-user-updated', !(data)->
      data.should.have.property 'location'
      data.location.should.have.property 'id', 'lid-1'
      data.should.have.property 'user'
      data.user.should.have.property '_id', 'uid-1'
      data.user.should.have.property 'username', 'xiaodong'
      data.should.have.property 'action', 'leave'
      waiter1!

    creator.locations-channel.emit 'close-web-page', {lid: 'lid-1', url: 'http://www.some.com'}, !(data)->
      data.should.have.property 'result', 'success'
      waiter2!

  can '如果只有一个tab打开这个页面，close时能够退出该页面上所有打开的兴趣点、会话、评论的room', !(done)->
    waiter = new utils.All-done-waiter done
    waiter1 = waiter.add-waiting-function!
    waiter2 = waiter.add-waiting-function!
    (observer) <-! socket-helper.get-client {logged-in: false}
    (observer2) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}
    (creator) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}

    observer.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
      data.fail '已经关闭了页面仍然收到之前打开过的会话的消息推送'

    observer2.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
      waiter1!

    (data) <-! observer.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
    current-lid = data.opened-web-page._id
    current-url = data.opened-web-page.urls.0
    (data) <-! creator.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
    data.should.have.property 'result', 'success'
    ipid = data.created-interesting-point._id
    ipsid = data.created-interesting-point.interesting-point-session._id
    (data) <-! observer.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: ipid, ipsid: ipsid}
    (data) <-! observer2.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: ipid, ipsid: ipsid}
    data.should.have.property 'result', 'success'
    (data) <-! observer.locations-channel.emit 'close-web-page', {lid: current-lid, url: current-url}
    data.should.have.property 'result', 'success'
    (data) <-! creator.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment <<< {ipid: ipid, ipsid: ipsid}
    <-! set-timeout _, 100
    data.should.have.property 'result', 'success'
    waiter2!

  can '如果打开不止一个tab是同一个页面，那么close后仍然能够收到打开的兴趣点、会话、评论的消息推送', !(done)->
    waiter = new utils.All-done-waiter done
    waiter1 = waiter.add-waiting-function!
    waiter2 = waiter.add-waiting-function!
    (observer) <-! socket-helper.get-client {logged-in: false}
    (creator) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}

    observer.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
      waiter1!

    (data) <-! observer.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
    current-lid = data.opened-web-page._id
    current-url = data.opened-web-page.urls.0
    (data) <-! creator.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
    data.should.have.property 'result', 'success'
    ipid = data.created-interesting-point._id
    ipsid = data.created-interesting-point.interesting-point-session._id
    (data) <-! observer.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: ipid, ipsid: ipsid}
    (data) <-! observer.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: ipid, ipsid: ipsid}
    data.should.have.property 'result', 'success'
    (data) <-! observer.locations-channel.emit 'close-web-page', {lid: current-lid, url: current-url}
    data.should.have.property 'result', 'success'
    (data) <-! creator.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment <<< {ipid: ipid, ipsid: ipsid}
    <-! set-timeout _, 100
    data.should.have.property 'result', 'success'
    waiter2!
