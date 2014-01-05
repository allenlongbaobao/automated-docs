# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/unlike-it/fixture/'

describe 'integrated test -- unlike-it', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/unlike-it', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! client.interesting-points-channel.emit 'unlike-it', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.interesting-points-channel.emit 'unlike-it', {type: 'interesting-point', id: 'xxx'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '请求的数据不存在时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    all-type = ['interesting-point', 'interesting-point-session', 'comment', 'reply']
    random-index = (Math.random! * all-type.length) .>>. 0
    (data) <-! client.interesting-points-channel.emit 'unlike-it', {type: all-type[random-index], id: 'inexistence-id'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '成功取消点赞后', !->
    client = null
    before-each !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      client := channels

      <-! client.interesting-points-channel.emit 'like-it', {type: 'interesting-point', id: 'ipid-1'}
      <-! client.interesting-points-channel.emit 'like-it', {type: 'interesting-point-session', id: 'ipsid-1'}
      <-! client.interesting-points-channel.emit 'like-it', {type: 'comment', id: 'cid-1'}
      <-! client.interesting-points-channel.emit 'like-it', {type: 'reply', id: 'rid-1'}
      done!

    can '能够收到正确的返回信息', !(done)->
      (data) <-! client.interesting-points-channel.emit 'unlike-it', {type: 'interesting-point', id: 'ipid-1'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '查询兴趣点不会出现数据', !(done)->
      (data) <-! client.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      interesting-point-before-operate = [.. for data.interesting-points when .._id is 'ipid-1'][0]
      (data) <-! client.interesting-points-channel.emit 'unlike-it', {type: 'interesting-point', id: 'ipid-1'}
      (data) <-! client.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      interesting-point-after-operate = [.. for data.interesting-points when .._id is 'ipid-1'][0]
      interesting-point-before-operate.liked-by.length.should.eql (interesting-point-after-operate.liked-by.length + 1)
      done!

    can '查询会话不会出现数据', !(done)->
      (data) <-! client.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      interesting-point-session-before-operate = [.. for data.interesting-point-sessions when .._id is 'ipsid-1'][0]
      (data) <-! client.interesting-points-channel.emit 'unlike-it', {type: 'interesting-point-session', id: 'ipsid-1'}
      (data) <-! client.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      interesting-point-session-after-operate = [.. for data.interesting-point-sessions when .._id is 'ipsid-1'][0]
      interesting-point-session-before-operate.liked-by.length.should.eql (interesting-point-session-after-operate.liked-by.length + 1)
      done!

    can '查询评论不会出现数据', !(done)->
      (data) <-! client.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-1', skip: 0, limit: 10}
      comment-before-operate = [.. for data.comments when .._id is 'cid-1'][0]
      (data) <-! client.interesting-points-channel.emit 'unlike-it', {type: 'comment', id: 'cid-1'}
      (data) <-! client.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-1', skip: 0, limit: 10}
      comment-after-operate = [.. for data.comments when .._id is 'cid-1'][0]
      comment-before-operate.liked-by.length.should.eql (comment-after-operate.liked-by.length + 1)
      done!

    can '查询回复不会出现数据', !(done)->
      (data) <-! client.interesting-points-channel.emit 'retrieve-replies', {cid: 'cid-1', skip: 0, limit: 10}
      reply-before-operate = [.. for data.replies when .._id is 'rid-1'][0]
      (data) <-! client.interesting-points-channel.emit 'unlike-it', {type: 'reply', id: 'rid-1'}
      (data) <-! client.interesting-points-channel.emit 'retrieve-replies', {cid: 'cid-1', skip: 0, limit: 10}
      reply-after-operate = [.. for data.replies when .._id is 'rid-1'][0]
      reply-before-operate.liked-by.length.should.eql (reply-after-operate.liked-by.length + 1)
      done!
