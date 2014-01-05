# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/create-a-new-web-interesting-point-on-a-new-url/fixture/'

request-create-a-new-web-interesting-point-on-a-new-url = utils.load-fixture FIXTURE_PATH + 'request-create-a-new-web-interesting-point-on-a-new-url'

describe 'integrated test -- create-a-new-web-interesting-point-on-a-new-url', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/create-a-new-web-interesting-point-on-a-new-url', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '创建过程中', !->
    can '当创建报文出错时，能够给回出错提示', !(done)->
      (client, datas) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', {}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    can '当用户未登录时，能够给回未登录提示', !(done)->
      (client, datas) <-! socket-helper.get-client {logged-in: false}
      (data) <-! client.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.should.include-eql {message: '事件create-a-new-web-interesting-point-on-a-new-url需要登录才能完成'}
      done!

  describe '新的公有兴趣点创建成功后', !->
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

      # 确保新创建的兴趣点时在小东当前的页面
      request-create-a-new-web-interesting-point-on-a-new-url.within-location.url = xiaodong-info.urls[0]
      request-create-a-new-web-interesting-point-on-a-new-url.content = "@weike 好吧。。"
      request-create-a-new-web-interesting-point-on-a-new-url.is-private = false
      request-create-a-new-web-interesting-point-on-a-new-url.shared-with = [baixin-info.uid]
      done!

    can '创建者能够收到返回的兴趣点对象和location对象', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.should.have.property 'createdLocation'
      data.should.have.property 'createdInterestingPoint'
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      data.created-interesting-point.should.have.property 'interestingPointSession'
      done!

    can '创建者的客户端能够收到服务端的询问内部性请求', !(done)->
      created-location = null
      xiaodong.locations-channel.on 'ask-location-internality', !(data)->
        <-! set-timeout _, 100 # 等待created-location返回
        data.should.have.property 'lid'
        data.should.have.property 'retrievedHtml'
        data.lid.should.eql created-location._id
        done!
      baixin.locations-channel.on 'ask-location-internality', !(data)->
        data.should.fail '非创建者收到了服务端的内部性询问请求'
      xiaodong.interesting-points-channel.emit "create-a-new-web-interesting-point-on-a-new-url", request-create-a-new-web-interesting-point-on-a-new-url, !(data)->
        created-location := data.created-location

    can '创建者客户端回答内部性请求后，同一个页面的用户能够收到location更新', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!
      created-location = null
      xiaodong.locations-channel.on 'ask-location-internality', !(data)->
        xiaodong.locations-channel.emit 'answer-location-internality', {result: 'success', is-internal: false, lid: data.lid}, !(data)->
          data.should.have.property 'result'
          data.should.have.property 'errors'
          data.result.should.eql 'success'
          data.errors.length.should.eql 0
      wangyu.locations-channel.on 'push-location-updated', !(data)->
        <-! set-timeout _, 100 # 确保created-location已经返回
        data.should.have.property '_id'
        data._id.should.eql created-location._id
        waiter1!
      xiaodong.locations-channel.on 'push-location-updated', !(data)->
        <-! set-timeout _, 100 # 确保created-location已经返回
        data.should.have.property '_id'
        data._id.should.eql created-location._id
        waiter2!
      baixin.locations-channel.on 'push-location-updated', !(data)->
        data.should.fail '不在同一个页面的用户收到了更新消息推送'
      xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url, !(data)->
        created-location := data.created-location
        waiter3!

    # can '创建者的好友能够收到兴趣点更新的推送消息', !(done)->
    #   created-interesting-point = null
    #   baixin.users-channel.on 'push-new-circle-interesting-point', !(data)->
    #     <-! set-timeout _, 100  # 保证created-interesting-point已经返回
    #     data.should.eql created-interesting-point
    #     done!
    #   weike.users-channel.on 'push-new-circle-interesting-point', !(data)->
    #     data.should.fail '非好友接收到好友的兴趣点更新'
    #   xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url, !(data)->
    #     created-interesting-point := data.created-interesting-point

    can '被@到的用户能够收到新的推送消息', !(done)->
      created-interesting-point = null
      weike.interesting-points-channel.on 'push-new-mention-in-interesting-point', !(data)->
        <-! set-timeout _, 100
        data.should.eql created-interesting-point
        done!
      xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url, !(data)->
        created-interesting-point := data.created-interesting-point

    can '其他用户到达location，能够获取location信息', !(done)->
      xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url, !(data)->
        (new-client, response-data) <-! socket-helper.get-client {logged-in: false, urls: data.created-location.urls}
        response-data.locations-channel.should.have.property 'locations'
        response-data.locations-channel.should.have.property 'inexistenceLocations'
        response-data.locations-channel.locations.length.should.eql 1
        response-data.locations-channel.locations.0._id.should.eql data.created-location._id
        done!

    can '若是私有兴趣点，只有被@到和被分享的用户能够收到消息通知', !(done)->
      request-create-a-new-web-interesting-point-on-a-new-url.is-private = true
      waiter = new utils.All-done-waiter done
      waiter-fn1 = waiter.add-waiting-function!
      waiter-fn2 = waiter.add-waiting-function!
      weike.interesting-points-channel.on 'push-new-mention-in-interesting-point', !(data)->
        waiter-fn1!
      baixin.interesting-points-channel.on 'push-new-shared-interesting-point', !(data)->
        waiter-fn2!
      xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url, !(data)->

    can '若是私有兴趣点，被@和被分享的用户可以查询，其他用户无法查询', !(done)->
      request-create-a-new-web-interesting-point-on-a-new-url.is-private = true
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url
      location = data.created-location
      (data) <-! wangyu.locations-channel.emit 'retrieve-interesting-points', {lid: location._id}
      data.should.have.property 'interestingPoints'
      data.interesting-points.length.should.eql 0 # 没记录！
      (data) <-! weike.locations-channel.emit 'retrieve-interesting-points', {lid: location._id}
      data.should.have.property 'interestingPoints'
      data.interesting-points.length.should.above 0 # 有记录！
      done!

    can '若是公有兴趣点，兴趣点和会话都能够被查询到', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url
      (data) <-! weike.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: data.created-interesting-point._id, limit: 10, skip: 0}
      data.should.have.property 'result', 'success'
      data.interesting-point-sessions.length.should.above 0
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
        data.location.should.have.property 'id'
        data.user.should.have.property '_id', xiaodong-info.uid
        data.user.should.have.property 'status', 'online'
        waiter1!
      (data) <-! xiaodong.interesting-points-channel.emit 'create-a-new-web-interesting-point-on-a-new-url', request-create-a-new-web-interesting-point-on-a-new-url
      data.should.have.property 'result', 'success'
      waiter2!

