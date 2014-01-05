# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + '/users-in-db'
FIXTURE_PATH = 'integrated/create-a-new-web-interesting-point/fixture/'

request-create-a-new-web-interesting-point = utils.load-fixture FIXTURE_PATH + 'request-create-a-new-web-interesting-point'

describe 'integrated test -- create-a-new-web-interesting-point', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/create-a-new-web-interesting-point', ['users', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '创建过程中', !->

    can '若提交的报文出错，能够给回出错信息', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data)<-! channels.interesting-points-channel.emit 'create-a-new-web-interesting-point', {}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    can '若未登录发送请求，能够给回未登录提示', !(done)->
      (channels) <-! socket-helper.get-client {logged-in: false}
      (data) <-! channels.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.should.include-eql {message: '事件create-a-new-web-interesting-point需要登录才能完成'}
      done!

    can '若对应的location不存在，能够给回出错信息', !(done)->
      request-create-a-new-web-interesting-point.within-location.lid = 'unexistence-location-id'
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

  describe '成功创建兴趣点后', !->
    # 这个测例中，我们设定四个个用户之间的关系：
    # 1. 小东是兴趣点的创建者
    # 2. 柏信是小东的好友，王瑜和伟科不是小东的好友
    # 3. 王瑜跟小东在同一个页面
    # 4. 小东创建兴趣点时，@到了伟科，并分享给柏信
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.baidu.com']}
    wangyu-info = {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
    weike-info = {uid: 'uid-4', logged-in: true, urls: ['http://baidu.com']}
    xiaodong = baixin = wangyu = weike = null

    before-each !(done)->
      (xiaodong-channels, datas) <-! socket-helper.get-client xiaodong-info
      (baixin-channels) <-! socket-helper.get-client baixin-info
      (wangyu-channels) <-! socket-helper.get-client wangyu-info
      (weike-channels) <-! socket-helper.get-client weike-info

      xiaodong := xiaodong-channels
      baixin := baixin-channels
      wangyu := wangyu-channels
      weike := weike-channels

      locations-channel-initial-response-data = datas.locations-channel
      xiaodong-current-location = locations-channel-initial-response-data.locations.0
      request-create-a-new-web-interesting-point.within-location.lid = xiaodong-current-location._id
      request-create-a-new-web-interesting-point.within-location.url = xiaodong-current-location.urls[0]
      request-create-a-new-web-interesting-point.is-private = false
      request-create-a-new-web-interesting-point.content = '@weike 好吧。。'
      request-create-a-new-web-interesting-point.shared-with = [baixin-info.uid]

      done!

    can '创建者能够获得返回的兴趣点数据，收不到推送消息', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'createdInterestingPoint'
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      # data.created-interesting-point.should.eql response-create-a-new-web-interesting-point
      done!

    can '兴趣点所在的location信息得到更新', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      (channels, response-data) <-! socket-helper.get-client {logged-in: false, urls: [request-create-a-new-web-interesting-point.within-location.url]}
      response-data.locations-channel.locations[0].interesting-points-count.should.eql 1
      done!

    # can '若是公有兴趣点，创建者的在线好友能够收到朋友圈兴趣点的推送', !(done)->
    #   baixin.users-channel.on 'push-new-circle-interesting-point', !(data)->
    #     # data.should.eql response-push-new-circle-interesting-point
    #     <-! set-timeout _, 100
    #     done!
    #   wangyu.users-channel.on 'push-interesting-point-updated', !(data)->
    #     data.should.fail '非好友用户收到圈子兴趣点的推送'
    #   weike.users-channel.on 'push-interesting-point-updated', !(data)->
    #     data.should.fail '非好友用户收到圈子兴趣点的推送'
    #   xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point, !(data)->

    can '若是公有兴趣点，同一个页面的在线用户能够收到兴趣点的推送消息', !(done)->
      wangyu.locations-channel.on 'push-interesting-point-updated', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type'
        data.type.should.eql 'added'
        data.should.have.property 'addedInterestingPoint'
        # data.added-interesting-point.should.eql response-push-interesting-point-updated
        done!
      baixin.locations-channel.on 'push-interesting-point-updated', !(data)->
        data.should.fail '不同页面的用户收到当前页面的兴趣点推送'
      weike.locations-channel.on 'push-interesting-point-updated', !(data)->
        data.should.fail '不同页面的用户收到当前页面的兴趣点推送'
      xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point, !(data)->

    can '若创建过程中@到其他用户，被@到的用户能够收到消息', !(done)->
      created-interesting-point = null
      weike.interesting-points-channel.on 'push-new-mention-in-interesting-point', !(data)->
        # 确保created-interesting-point已经返回
        <-! set-timeout _, 100
        data.should.eql created-interesting-point
        done!
      baixin.interesting-points-channel.on 'push-new-mention-in-interesting-point', !(data)->
        data.should.failed '没有被@到的用户收到了@消息'
      wangyu.interesting-points-channel.on 'push-new-mention-in-interesting-point', !(data)->
        data.should.failed '没有被@到的用户收到了@消息'
      xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point, !(data)->
        created-interesting-point := data.created-interesting-point

    can '若是公有兴趣点，能够被用户查询到', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      (retrieve-result) <-! wangyu.locations-channel.emit 'retrieve-interesting-points', {lid: data.created-interesting-point.within-location.lid, offset: 0, count: 10}
      retrieve-result.should.have.property 'result'
      retrieve-result.should.have.property 'errors'
      retrieve-result.should.have.property 'interestingPointsCount'
      retrieve-result.should.have.property 'interestingPoints'
      retrieve-result.interesting-points.0._id.should.eql data.created-interesting-point._id
      (retrieve-result) <-! wangyu.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: data.created-interesting-point._id, limit: 10, skip: 0}
      retrieve-result.should.have.property 'result', 'success'
      retrieve-result.interesting-point-sessions.length.should.above 0
      done!

    can '若是公有兴趣点，在location的参与用户中查询到创建者', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      data.should.have.property 'result', 'success'
      created-interesting-point = data.created-interesting-point
      (data) <-! wangyu.locations-channel.emit 'retrieve-attended-users', {lid: created-interesting-point.within-location.lid}
      data.should.have.property 'result', 'success'
      data.should.have.property 'users'
      [.._id for data.users].should.include-eql xiaodong-info.uid
      done!

    can '若是公有兴趣点，同一个location的用户能收到创建者的信息推送', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      (data) <-! baixin.locations-channel.emit 'open-web-page', {url: 'http://www.some.com'}
      data.should.have.property 'result', 'success'
      baixin.locations-channel.on 'push-attended-user-updated', !(data)->
        data.should.have.property 'location'
        data.should.have.property 'user'
        data.location.should.have.property 'id', 'lid-1'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'status', 'online'
        waiter1!
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      data.should.have.property 'result', 'success'
      waiter2!

    can '若是私有兴趣点，只有被分享和被@的用户能够收到消息推送，而其他用户不能收到', !(done)->
      request-create-a-new-web-interesting-point.is-private = true
      created-interesting-point = null
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      weike.interesting-points-channel.on 'push-new-mention-in-interesting-point',  !(data)->
        <-! set-timeout _, 100 # 保证created-interesting-point已经返回
        data.should.eql created-interesting-point
        waiter1!
      baixin.interesting-points-channel.on 'push-new-shared-interesting-point', waiter.add-waiting-function !(data)->
        <-! set-timeout _, 100 # 保证created-interesting-point已经返回
        data.should.eql created-interesting-point
        waiter2!
      wangyu.interesting-points-channel.on 'push-interesting-point-updated', !(data)->
        data.should.fail '同个页面的用户收到了私有兴趣点更新'
      xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point, !(data)->
        created-interesting-point := data.created-interesting-point

    can '若是私有兴趣点，兴趣点数据只有被分享的用户能够查询，其他用户查询不到', !(done)->
      request-create-a-new-web-interesting-point.is-private = true
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      (not-found-data) <-! wangyu.locations-channel.emit 'retrieve-interesting-points', {lid: data.created-interesting-point.within-location.lid, offset: 0, count: 10}
      not-found-data.should.have.property 'result'
      not-found-data.should.have.property 'errors'
      not-found-data.should.have.property 'interestingPoints'
      not-found-data.result.should.eql 'success'
      not-found-data.errors.length.should.eql 0
      not-found-data.interesting-points.length.should.eql 0 # 没记录！
      (found-data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: data.created-interesting-point.within-location.lid, offset: 0, count: 10}
      found-data.should.have.property 'result'
      found-data.should.have.property 'errors'
      found-data.should.have.property 'interestingPoints'
      found-data.result.should.eql 'success'
      found-data.errors.length.should.eql 0
      found-data.interesting-points.length.should.above 0 # 有记录！
      done!

    can '若是私有兴趣点，只有自己、被@、被分享的用户能够在该location的参与用户在查询到创建者', !(done)->
      request-create-a-new-web-interesting-point.is-private = true
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point', request-create-a-new-web-interesting-point
      data.should.have.property 'result', 'success'
      created-interesting-point = data.created-interesting-point
      (data) <-! wangyu.locations-channel.emit 'retrieve-attended-users', {lid: created-interesting-point.within-location.lid}
      data.should.have.property 'result', 'success'
      data.should.have.property 'users'
      [.._id for data.users].should.not.include-eql xiaodong-info.uid # 不相关用户查询不到
      (data) <-! xiaodong.locations-channel.emit 'retrieve-attended-users', {lid: created-interesting-point.within-location.lid}
      data.should.have.property 'result', 'success'
      data.should.have.property 'users'
      [.._id for data.users].should.include-eql xiaodong-info.uid # 自己可以查询到
      (data) <-! baixin.locations-channel.emit 'retrieve-attended-users', {lid: created-interesting-point.within-location.lid}
      data.should.have.property 'result', 'success'
      data.should.have.property 'users'
      [.._id for data.users].should.include-eql xiaodong-info.uid # 被分享的人可以查询到
      done!
