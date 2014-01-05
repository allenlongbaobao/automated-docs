# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-interesting-points/fixture/'

describe 'unit test -- retrieve-interesting-points', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-interesting-points', ['users', 'locations', 'interesting-points', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels, response-data) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.locations-channel.emit 'retrieve-interesting-points', {}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.result.should.eql 'failed'
    data.errors.length.should.above 0
    done!

  describe '成功查询时', !(done)->
    # 在这个测例中，我们设定：
    # 1. 当前位置为(http://www.some.com)，假设_id为'lid-1'
    # 2. 所有兴趣点创建者是小东，五个私有，五个公有
    # 3. 私有兴趣点中有三个@到了王瑜，有四个分享给柏信
    xiaodong-info = {uid: 'uid-1', logged-in: true, urls: ['http://www.some.com']}
    baixin-info = {uid: 'uid-2', logged-in: true, urls: ['http://www.some.com']}
    wangyu-info = {uid: 'uid-3', logged-in: true, urls: ['http://www.some.com']}
    xiaodong = baixin = wangyu = null

    before-each !(done)->
      (xiaodong-channel, response-data) <-! socket-helper.get-client xiaodong-info
      (baixin-channel, response-data) <-! socket-helper.get-client baixin-info
      (wangyu-channel, response-data) <-! socket-helper.get-client wangyu-info

      xiaodong := xiaodong-channel
      baixin := baixin-channel
      wangyu := wangyu-channel

      done!

    can '能够返回正确的兴趣点数组', !(done)->
      (data) <-! xiaodong.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 1, count: 7}
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      data.interesting-points-count.should.eql 10
      data.interesting-points.length.should.eql 7
      data.interesting-points.0._id.should.eql 'ipid-2'
      done!

    can '未登录用户只能查询到公有兴趣点', !(done)->
      (channels) <-! socket-helper.get-client {logged-in: false}
      (data) <-! channels.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1'}
      data.result.should.eql 'success'
      data.interesting-points-count.should.eql 10
      data.errors.length.should.eql 0
      data.interesting-points.length.should.eql 5
      done!

    can '登录用户中，只有被@和被分享的用户能够查询到私有兴趣点', !(done)->
      (data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1'}
      data.interesting-points-count.should.eql 10
      data.interesting-points.length.should.eql 9
      (data) <-! wangyu.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1'}
      data.interesting-points-count.should.eql 10
      data.interesting-points.length.should.eql 8
      (data) <-! xiaodong.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1'}
      data.interesting-points-count.should.eql 10
      data.interesting-points.length.should.eql 10
      done!
