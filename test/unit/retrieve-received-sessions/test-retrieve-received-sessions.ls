# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-received-sessions/fixture/'

describe 'unit test -- retrieve-received-sessions', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-received-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-sessions', {haha: false}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-sessions', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '正常请求后', !->
    xiaodong = null
    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
      xiaodong := xiaodong-channel
      done!

    # 在下面的测例中，我们设定：
    # 1. 小东创建了兴趣点 ipid-1和会话ipsid-1
    # 2. 柏信创建了兴趣点 ipid-2 和会话 ipsid-2
    # 3. 小东关注了兴趣点 ipid-2
    # 4. 柏信在兴趣点 ipid-1 中创建会话ipsid-3和 ipsid-4
    # 5. 王瑜在兴趣点 ipid-2 中创建会话ipsid-5，ipsid-6 和 ipsid-7
    # 6. 其中小东已经阅读了ipsid-1和ipsid-2的消息
    can '能够返回正确的数据格式', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'receivedSessions'
      for data.received-sessions then
        ..should.have.property 'sessionIndex'
        ..should.have.property 'url'
      done!

    can '能够通过skip和limit控制返回数据', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {skip: 0, limit: 3}
      data.received-sessions.length.should.not.above 3
      the-third-session = data.received-sessions.2
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {skip: 2, limit: 2}
      data.received-sessions.length.should.not.above 2
      data.received-sessions.0._id.should.eql the-third-session._id
      done!

    can '能够通过from返回特定用户创建的消息', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {from: 'uid-2'}
      data.received-sessions.length.should.above 0
      for data.received-sessions then
        ..created-by._id.should.eql 'uid-2'
      done!

    can '能够通过type返回特定类型的数据', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {type: 'created'}
      data.received-sessions.length.should.eql 3
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {type: 'watching'}
      data.received-sessions.length.should.eql 4
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {type: 'all'}
      data.received-sessions.length.should.eql 7
      done!

    can '能够通过unread返回未读的数据', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {unread: true}
      data.received-sessions.length.should.eql 5
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {unread: true, type: 'created'}
      data.received-sessions.length.should.eql 2
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-sessions', {unread: false}
      data.received-sessions.length.should.eql 7
      done!
