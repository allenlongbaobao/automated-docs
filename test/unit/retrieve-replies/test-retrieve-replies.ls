# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-replies/fixture/'

describe 'unit test -- retrieve-replies', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-replies', ['locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够返回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-replies', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '回复所在的评论不存在时，返回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-replies', {cid: 'inexistence-cid'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  # 在下面的所有测例中，我们设定
  # 1. 评论id为mid-1有7条回复，3条是历史，4条是最新
  # 2. 评论id为mid-9的只有一条回复，且为匿名回复
  can '若没有设置last-access-time，能够根据skip, limit, sort返回正确的数据', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-replies', {cid: 'mid-1', skip: 0, limit: 3}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'replies'
    data.replies.length.should.below 4
    oldest-reply = data.replies[*-1]
    (data) <-! channels.interesting-points-channel.emit 'retrieve-replies', {cid: 'mid-1', skip: 0, limit: 3, sort: 0}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'replies'
    data.replies.length.should.below 4
    newest-reply = data.replies[*-1]
    (newest-reply.create-time > oldest-reply.create-time).should.be.true
    done!

  can '若设置了last-access-time，能够根据last-access-time, limit, sort返回正确的数据', !(done)->
    last-access-time = '' + new Date
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-replies', {cid: 'mid-1', last-access-time: last-access-time, skip: 10000, limit: 3}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'replies'
    data.replies.length.should.below 4
    random-index = (Math.random! * data.replies.length) .>>. 0
    (data.replies[random-index].create-time > JSON.stringify(new Date last-access-time)).should.be.true
    done!

  can '若查询内容有匿名回复，该回复的创建者信息会被隐藏', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-replies', {cid: 'mid-9', skip: 0, limit: 1}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'replies' .with.length 1
    data.replies.0.is-anonymous.should.be.true
    data.replies.0.should.have.property 'sendBy'
    data.replies.0.send-by.username.should.eql '匿名用户'
    data.replies.0.send-by._id.should.eql ''
    done!
