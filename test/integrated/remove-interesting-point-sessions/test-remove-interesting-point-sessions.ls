# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/remove-interesting-point-sessions/fixture/'

describe 'integrated test -- remove-interesting-point-sessions', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/remove-interesting-point-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回错误信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'remove-interesting-point-sessions', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件remove-interesting-point-sessions需要登录才能完成'}
    done!

  can '请求删除的会话不存在时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-1', 'inexistence-ipsid']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '删除过程中，操作者没有权限删除', !->
    # 在下面的测例中，我们设定
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信在ipid-1中创建了会话ipsid-2
    # 4. 伟科在ipsid-2中创建了评论
    # 5. 王瑜关注了会话ipsid-2
    baixin-info = {uid: 'uid-2', logged-in: true}
    wangyu-info = {uid: 'uid-3', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    baixin = wangyu = weike = null

    request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-2', type: 'ips-msg', original-content-type: 'text', text-content: 'test', voice-content: 'xxx', is-anonymous: false

    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info

      baixin := baixin-channel
      wangyu := wangyu-channel
      weike := weike-channel

      done!

    can '不是会话创建者时，能够给回错误提示', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.length.should.above 0
      done!

    can '会话中有用户评论过，删除时能够给回错误提示', !(done)->
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      (data) <-! baixin.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-2']}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.length.should.above 0
      done!

    can '会话被用户关注过，删除时能够给回错误提示', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      (data) <-! baixin.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-2']}
      data.should.have.property 'result', 'failed'
      data.should.have.property 'errors'
      data.errors.length.should.above 0
      done!

  describe '成功删除会话后', !->
    # 在这个测例中， 我们设定：
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信在ipid-1上创建了会话ipsid-2
    # 3. 伟科对兴趣点ipid-1进行关注
    # 4. 王瑜正在浏览兴趣点ipid-1和兴趣点会话ipsid-1
    xiaodong-info = {uid: 'uid-1', logged-in: true}
    baixin-info = {uid: 'uid-2', logged-in: true}
    wangyu-info = {uid: 'uid-3', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    xiaodong = baixin = wangyu = weike = null

    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client xiaodong-info
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info

      xiaodong := xiaodong-channel
      baixin := baixin-channel
      wangyu := wangyu-channel
      weike := weike-channel

      done!

    can '能够返回操作成功消息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-2']}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '会话所在的兴趣点创建者、订阅者、浏览者能够收到消息推送', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!

      xiaodong.interesting-points-channel.on 'push-session-updated-in-created-interesting-point', !(data)->
        data.should.have.property 'type', 'removed'
        data.should.have.property 'removedInterestingPointSession'
        waiter1!
      weike.interesting-points-channel.on 'push-session-updated-in-watching-interesting-point', !(data)->
        data.should.have.property 'type', 'removed'
        data.should.have.property 'removedInterestingPointSession'
        waiter2!
      wangyu.interesting-points-channel.on 'push-session-updated-in-opening-interesting-point', !(data)->
        data.should.have.property 'type', 'removed'
        data.should.have.property 'removedInterestingPointSession'
        waiter3!

      <-! weike.interesting-points-channel.emit 'watch-interesting-points', {ipids: ['ipid-1']}
      <-! wangyu.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'ipsid-1'}
      <-! baixin.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-2']}

    can '被删除的会话信息不会被查询到', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      interesting-point-sessions-count-before-remove = data.interesting-point-sessions.length
      (data) <-! baixin.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-2']}
      (data) <-! wangyu.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      data.interesting-point-sessions.length.should.below interesting-point-sessions-count-before-remove
      done!

    can '对应的兴趣点的会话数会减少', !(done)->
      (data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      interesting-point-before-operate = [.. for data.interesting-points when .._id is 'ipid-1'][0]
      (data) <-! baixin.interesting-points-channel.emit 'remove-interesting-point-sessions', {ipsids: ['ipsid-2']}
      (data) <-! baixin.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      interesting-point-after-operate = [.. for data.interesting-points when .._id is 'ipid-1'][0]
      interesting-point-before-operate.interesting-point-sessions-count.should.eql (interesting-point-after-operate.interesting-point-sessions-count + 1)
      done!
