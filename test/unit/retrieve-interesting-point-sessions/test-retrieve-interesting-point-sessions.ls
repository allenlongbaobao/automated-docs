# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-interesting-point-sessions/fixture/'

describe 'unit test -- retrieve-interesting-point-sessions', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-interesting-point-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels, response-data) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.result.should.eql 'failed'
    data.errors.length.should.above 0
    done!

  can '若所在的兴趣点不存在，返回错误信息', !(done)->
    (channels, response-data) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'inexistence-interesting-point-id', skip: 0, limit: 10}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.result.should.eql 'failed'
    data.errors.length.should.above 0
    done!

  # 这个测例中，我们设定:
  # 1. 小东创建了一个私有兴趣点
  # 2. 私有兴趣点中@到了柏信，并分享给王瑜
  can '若所在的兴趣点是私有的，只有创建者、被分享、被@的用户能够查询到数据', !(done)->
    (xiaodong) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
    (wangyu) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
    (weike) <-! socket-helper.get-client {uid: 'uid-4', logged-in: true}
    request-data = {ipid: 'ipid-1', skip: 0, limit: 10}

    waiter = new utils.All-done-waiter done
    waiter1 = waiter.add-waiting-function!
    waiter2 = waiter.add-waiting-function!
    waiter3 = waiter.add-waiting-function!
    waiter4 = waiter.add-waiting-function!

    xiaodong.interesting-points-channel.emit 'retrieve-interesting-point-sessions', request-data, !(data)->
      data.interesting-point-sessions.length.should.above 0
      waiter1!
    baixin.interesting-points-channel.emit 'retrieve-interesting-point-sessions', request-data, !(data)->
      data.interesting-point-sessions.length.should.above 0
      waiter2!
    wangyu.interesting-points-channel.emit 'retrieve-interesting-point-sessions', request-data, !(data)->
      data.interesting-point-sessions.length.should.above 0
      waiter3!
    weike.interesting-points-channel.emit 'retrieve-interesting-point-sessions', request-data, !(data)->
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      waiter4!

  can '若没有设置last-access-time，可以根据skip, limit, sort获取历史数据', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-2', skip: 0, limit: 3, last-access-time: ''}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.should.have.property 'interestingPointSessions'
    data.result.should.equal 'success'
    data.errors.length.should.eql 0
    data.interesting-point-sessions.length.should.below 4
    oldest-session = data.interesting-point-sessions[*-1]
    (data) <-! channels.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-2', skip: 0, limit: 3, last-access-time: '', sort: 0}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.should.have.property 'interestingPointSessions'
    data.result.should.equal 'success'
    data.errors.length.should.eql 0
    data.interesting-point-sessions.length.should.below 4
    newest-session = data.interesting-point-sessions[*-1]
    (newest-session.create-time > oldest-session.create-time).should.be.true
    done!

  can '若设置了last-access-time，可以根据LAT和limit获取最新数据', !(done)->
    last-access-time  = '' + new Date
    (channels)  <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-2', skip: 10000, limit: 3, last-access-time: last-access-time}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.should.have.property 'interestingPointSessions'
    data.result.should.eql 'success'
    data.errors.length.should.eql 0
    data.interesting-point-sessions.length.should.below 4
    random-index = (Math.random! * data.interesting-point-sessions.length) .>>. 0
    (data.interesting-point-sessions[random-index].create-time > JSON.stringify(new Date last-access-time)).should.be.true
    done!
