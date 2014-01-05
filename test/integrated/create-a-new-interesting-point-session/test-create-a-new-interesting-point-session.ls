# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/create-a-new-interesting-point-session/fixture/'

request-create-a-new-interesting-point-session = utils.load-fixture FIXTURE_PATH + 'request-create-a-new-interesting-point-session'

describe 'integrated test -- create-a-new-interesting-point-session', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/create-a-new-interesting-point-session', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '兴趣点会话创建过程中', !->

    can '请求的报文出错，能够给回出错提示', !(done)->
      (client, response-data) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-interesting-point-session', {}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    can '用户未登录时，能够给回未登录提示', !(done)->
      (client, response-data) <-! socket-helper.get-client {logged-in: false, urls: ['http://www.some.com']}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.should.include-eql {message: '事件create-a-new-interesting-point-session需要登录才能完成'}
      done!

    can '兴趣点不存在时，能够给回出错信息', !(done)->
      (client, response-data) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-interesting-point-session', (request-create-a-new-interesting-point-session <<< {ipid: 'inexistence-ipid'})
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    # 这个测例中，我们设定
    # 1. uid-1创建了私有兴趣点ipid-2
    # 2. 兴趣点ipid-2分享给了uid-2，@到了uid-3
    can '若兴趣点是私有兴趣点时，只有创建者、被@的用户、被分享的用户能够创建会话', !(done)->
      (client1) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (client2) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (client3) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
      (client4) <-! socket-helper.get-client {uid: 'uid-4', logged-in: true}

      (data) <-! client1.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-2', title: 'test'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      (data) <-! client2.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-2', title: 'test'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      (data) <-! client3.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-2', title: 'test'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      (data) <-! client4.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-2', title: 'test'}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.length.should.above 0
      done!

  describe '成功创建兴趣点会话后', !->
    # 在这个测例中，我们设定：
    # 1. baixin创建了这个兴趣点会话
    # 2. 兴趣点会话所在的兴趣点创建者是xiaodong
    # 3. wangyu正在看这个兴趣点
    # 4. weike关注了兴趣点
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
    wangyu-info = {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
    weike-info = {uid: 'uid-4', logged-in: true, urls: ['http://www.baidu.com']}
    xiaodong = baixin = wangyu = weike = null

    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client xiaodong-info
      (baixin-channel, response-data) <-! socket-helper.get-client baixin-info
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info

      xiaodong := xiaodong-channel
      baixin := baixin-channel
      wangyu := wangyu-channel
      weike := weike-channel

      baixin-current-location = response-data.locations-channel.locations[0]
      (result) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: baixin-current-location._id, offset: 0, count: 10}
      # 确保创建的会话从属于存在的兴趣点
      request-create-a-new-interesting-point-session.ipid = result.interesting-points[0]._id
      done!

    can '创建者能够获得创建后的兴趣点会话数据', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'createdInterestingPointSession'
      data.result.should.eql 'success'
      data.created-interesting-point-session.should.have.property 'url'
      data.created-interesting-point-session.should.have.property 'sessionIndex'
      data.errors.length.should.eql 0
      data.created-interesting-point-session.title.should.eql request-create-a-new-interesting-point-session.title
      data.created-interesting-point-session.ipid.should.eql request-create-a-new-interesting-point-session.ipid
      done!

    can '创建者能够出现在兴趣点的参与用户列表中', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      (data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      data.should.have.property 'result', 'success'
      data.should.have.property 'interestingPoints'
      data.interesting-points.0.should.have.property 'participant'
      [.._id for data.interesting-points.0.participant].should.include baixin-info.uid
      done!

    can '关注了兴趣点的用户能够收到更新消息推送', !(done)->
      created-interesting-point-session = null
      weike.interesting-points-channel.on 'push-session-updated-in-watching-interesting-point', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedInterestingPointSession'
        data.type.should.eql 'added'
        data.added-interesting-point-session.should.eql created-interesting-point-session
        done!
      (data) <-! weike.interesting-points-channel.emit 'watch-interesting-points', {ipids: [request-create-a-new-interesting-point-session.ipid]}
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      created-interesting-point-session := data.created-interesting-point-session

    can '兴趣点的创建者能够收到更新消息推送', !(done)->
      created-interesting-point-session = null
      xiaodong.interesting-points-channel.on 'push-session-updated-in-created-interesting-point', !(data)->
        # 保证created-interesting-point-session已经返回
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedInterestingPointSession'
        data.type.should.eql 'added'
        data.added-interesting-point-session.should.eql created-interesting-point-session
        done!
      baixin.interesting-points-channel.on 'push-session-updated-in-created-interesting-point', !(data)->
        data.should.fail '会话创建者收到了消息推送'
      weike.interesting-points-channel.on 'push-session-updated-in-created-interesting-point', !(data)->
        data.should.fail '不相关用户接收到消息推送'
      baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session, !(data)->
        created-interesting-point-session := data.created-interesting-point-session

    can '打开了该兴趣点的用户能够收到更新消息推送', !(done)->
      created-interesting-point-session = null
      wangyu.interesting-points-channel.on 'push-session-updated-in-opening-interesting-point', !(data)->
        # 保证created-interesting-point-session已经返回
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.should.have.property 'addedInterestingPointSession'
        data.type.should.eql 'added'
        data.added-interesting-point-session.should.eql created-interesting-point-session
        done!
      (data) <-! wangyu.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: request-create-a-new-interesting-point-session.ipid}
      (data) <-! wangyu.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: request-create-a-new-interesting-point-session.ipid, ipsid: data.interesting-point-sessions[0]._id}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      created-interesting-point-session := data.created-interesting-point-session

    can '对应的兴趣点的会话数量会增加', !(done)->
      (data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      interesting-point-before-operate = [.. for data.interesting-points when .._id is request-create-a-new-interesting-point-session.ipid][0]
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      (data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      interesting-point-after-operate = [.. for data.interesting-points when .._id is request-create-a-new-interesting-point-session.ipid][0]
      interesting-point-before-operate.interesting-point-sessions-count.should.eql (interesting-point-after-operate.interesting-point-sessions-count - 1)
      done!

    can '在location的参与用户中能够被查询到创建者', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      (data) <-! xiaodong.locations-channel.emit 'retrieve-attended-users', {lid: 'lid-1'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'users'
      [.._id for data.users].should.include-eql baixin-info.uid
      done!

    can '在同一个location的用户能够收到创建者的推送信息', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (data) <-! xiaodong.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
      data.should.have.property 'result', 'success'
      xiaodong.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.should.have.property 'user'
        data.location.should.have.property 'id', 'lid-1'
        data.user.should.have.property '_id', baixin-info.uid
        data.user.should.have.property 'status', 'online'
        waiter1!
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      data.should.have.property 'result', 'success'
      waiter2!
