# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-received-replies/fixture/'

describe 'unit test -- retrieve-received-replies', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-received-replies', ['messages', 'users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够返回出错数据', !(done)->
    (client) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-replies', {haha: false}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够返回出错信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-replies', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '正常请求时', !->
    # 下面的测例我们设定：
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信创建了在ipsid-1中评论cid-1
    # 3. 王瑜在评论cid-1中创建了回复rid-1, rid-2, rid-3
    # 4. 伟科在评论cid-1中创建了回复rid-4, rid-5
    # 5. 其中柏信已经阅读了rid-1和rid-4
    baixin = null
    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client {logged-in: true, uid: 'uid-2'}
      baixin := baixin-channel
      done!

    can '能够返回正确的数据格式', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      for data.received-replies then
        ..should.have.property 'url'
        ..should.have.property 'sessionIndex'
        ..should.have.property 'commentIndex'
        ..should.have.property 'replyIndex'
      done!

    can '能够根据skip和limit获取正确的数据', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {skip: 0, limit: 3}
      data.received-replies.length.should.not.above 3
      the-third-reply = data.received-replies.2
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {skip: 2, limit: 3}
      data.received-replies.length.should.not.above 3
      data.received-replies.0._id.should.eql the-third-reply._id
      done!

    can '能够根据from获取特定用户的消息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {from: 'uid-3'}
      data.received-replies.length.should.eql 3
      for data.received-replies then ..send-by._id.should.eql 'uid-3'
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {from: 'uid-4'}
      data.received-replies.length.should.eql 2
      for data.received-replies then ..send-by._id.should.eql 'uid-4'
      done!

    can '能够根据unread获取未读的消息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {unread: true}
      data.received-replies.length.should.eql 3
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {unread: true, from: 'uid-3'}
      data.received-replies.length.should.eql 2
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {unread: false}
      data.received-replies.length.should.eql 5
      done!
