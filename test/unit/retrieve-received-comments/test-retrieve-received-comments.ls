# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-received-comments/fixture/'

describe 'unit test -- retrieve-received-comments', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-received-comments', ['locations', 'users', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '报文异常时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-comments', {haha: 'wrong..'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-comments', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '正常请求后', !->
    # 在下面的测例中，我们设定：
    # 1. 小东创建了ipid-1和ipsid-1
    # 2. 柏信创建了ipid-2和ipsid-2
    # 3. 小东关注了ipsid-2
    # 4. 王瑜在ipsid-1中创建了cid-1,cid-2,cid-3
    # 5. 伟科在ipsid-2中创建cid-4,cid-5
    # 6. 其中cid-1和cid-5已经阅读过
    xiaodong = null
    before-each !(done)->
      (xiaodong-channel) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
      xiaodong := xiaodong-channel
      done!

    can '能够得到正确的数据格式', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'receivedComments'
      for data.received-comments then
        ..should.have.property 'url'
        ..should.have.property 'sessionIndex'
        ..should.have.property 'commentIndex'
      done!

    can '能够通过skip和limit得到正确的数据', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {skip: 0, limit: 3}
      data.received-comments.length.should.not.above 3
      the-third-comment = data.received-comments.2
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {skip: 2, limit: 3}
      data.received-comments.length.should.not.above 3
      data.received-comments.0._id.should.eql the-third-comment._id
      done!

    can '能够通过from获取特定用户的消息', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {from: 'uid-3'}
      data.received-comments.length.should.eql 3
      for data.received-comments then
        ..send-by._id.should.eql 'uid-3'
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {from: 'uid-4'}
      data.received-comments.length.should.eql 2
      for data.received-comments then
        ..send-by._id.should.eql 'uid-4'
      done!

    can '能偶通过type获取特定类型的消息', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {type: 'created'}
      data.received-comments.length.should.eql 3
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {type: 'watching'}
      data.received-comments.length.should.eql 2
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {type: 'all'}
      data.received-comments.length.should.eql 5
      done!

    can '能够通过unread获取未读的消息', !(done)->
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {unread: true}
      data.received-comments.length.should.eql 3
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {unread: true, type: 'created'}
      data.received-comments.length.should.eql 2
      (data) <-! xiaodong.interesting-points-channel.emit 'retrieve-received-comments', {unread: false}
      data.received-comments.length.should.eql 5
      done!
