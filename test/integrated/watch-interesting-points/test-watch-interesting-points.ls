# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/watch-interesting-points/fixture/'

describe 'integrated test -- watch-interesting-points', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/watch-interesting-points', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'watch-interesting-points', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给出未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件watch-interesting-points需要登录才能完成'}
    done!

  can '关注的兴趣点不存在时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1', 'inexistence-ipid']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '关注的兴趣点中有私有兴趣点且操作者不是合法时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-3', 'ipid-1']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  # 下面的测例中，我们设定：
  # 1. 小东创建了兴趣点ipid-1和ipid-2
  # 2. 柏信关注了兴趣点ipid-1和ipid-2
  # 3. 伟科分别在ipid-1和ipid-2中创建新的session
  describe '成功关注后', !->
    baixin-info = {uid: 'uid-2', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    baixin = weike = null

    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (weike-channel) <-! socket-helper.get-client weike-info

      baixin := baixin-channel
      weike := weike-channel
      done!

    can '能够收到关注成功提示', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1', 'ipid-2']}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '请求关注的兴趣点id有重复时，能够正常操作', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1', 'ipid-2', 'ipid-1', 'ipid-2']}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '能够收到该兴趣点的会话更新', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      count = 0
      baixin.interesting-points-channel.on 'push-session-updated-in-watching-interesting-point', !(data)->
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedInterestingPointSession'
        waiter1! if ++count is 2

      <-! baixin.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1', 'ipid-2']}
      <-! weike.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-1', title: 'test'}
      <-! weike.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-2', title: 'test'}
      waiter2!

    can '再次关注同一个兴趣点，可以正常操作', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      baixin.interesting-points-channel.on 'push-session-updated-in-watching-interesting-point', !(data)->
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedInterestingPointSession'
        waiter2!

      <-! baixin.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1', 'ipid-2']}
      <-! baixin.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1']}
      <-! weike.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-1', title: 'test'}
      <-! weike.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-2', title: 'test'}
      waiter1!

    can '兴趣点的关注列表中能够查询到操作者的信息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1', 'ipid-2']}
      (data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'interestingPoints' .with.length 2 # ipid-1和ipid-2
      random-index = (Math.random! * data.interesting-points.length) .>>. 0
      data.interesting-points[random-index].watched-by.should.include baixin-info.uid
      done!
