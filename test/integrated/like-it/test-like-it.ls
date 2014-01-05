# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/like-it/fixture/'

describe 'integrated test -- like-it', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/like-it', ['users', 'locations', 'interesting-point-sessions', 'interesting-points', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'like-it', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'like-it', {type: 'interesting-point', id: 'xxx'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件like-it需要登录才能完成'}
    done!

  can '请求的数据不存在时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    all-type = ['interesting-point', 'interesting-point-session', 'comment', 'reply']
    random-index = (Math.random! * all-type.length) .>>. 0
    (data) <-! channels.interesting-points-channel.emit 'like-it', {type: all-type[random-index], id: 'inexistence-id'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '成功点赞后', !->
    # 在这个测例中，我们设定：
    # 数据库中有兴趣点ipid-1和会话ipsid-1
    # 会话中有评论cid-1和回复rid-1
    can '能够收到操作成功消息', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'like-it', {type: 'interesting-point', id: 'ipid-1'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '对兴趣点点赞后，能够被查询到', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'like-it', {type: 'interesting-point', id: 'ipid-1'}
      (data) <-! channels.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
      interesting-point = [.. for data.interesting-points when .._id is 'ipid-1'][0]
      interesting-point.should.have.property 'likedBy'
      interesting-point.liked-by.should.include 'uid-1'
      done!

    can '对会话点赞后，能够被查询到', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'like-it', {type: 'interesting-point-session', id: 'ipsid-1'}
      (data) <-! channels.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      interesting-point-session = [.. for data.interesting-point-sessions when .._id is 'ipsid-1'][0]
      interesting-point-session.should.have.property 'likedBy'
      interesting-point-session.liked-by.should.include 'uid-1'
      done!

    can '对评论点赞后，能够被查询到', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'like-it', {type: 'comment', id: 'cid-1'}
      (data) <-! channels.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-1', skip: 0, limit: 10}
      comment = [.. for data.comments when .._id is 'cid-1'][0]
      comment.should.have.property 'likedBy'
      comment.liked-by.should.include 'uid-1'
      done!

    can '对回复点赞后，能够被查询到', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'like-it', {type: 'reply', id: 'rid-1'}
      (data) <-! channels.interesting-points-channel.emit 'retrieve-replies', {cid: 'cid-1', skip: 0, limit: 10}
      reply = [.. for data.replies when .._id is 'rid-1'][0]
      reply.should.have.property 'likedBy'
      reply.liked-by.should.include 'uid-1'
      done!
