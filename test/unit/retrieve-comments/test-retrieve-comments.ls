# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-comments/fixture/'

describe 'unit test -- retrieve-comments', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-comments', ['users', 'messages', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够返回出错信息', !(done)->
    (channels, response-data) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-comments', {}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.result.should.eql 'failed'
    data.errors.length.should.above 0
    done!

  can '评论所在会话不存在时，返回错误信息', !(done)->
    (channels, response-data) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'inexistence-interesting-point-session-id'}
    data.should.have.property 'result'
    data.should.have.property 'errors'
    data.result.should.eql 'failed'
    data.errors.length.should.above 0
    done!

  # 这个测例中，我们设定
  # 1. 小东创建了私有兴趣点ipid-1和会话ipsid-1
  # 2. 私有兴趣点@到了柏信，并分享给王瑜
  can '评论所在兴趣点是私有时，只有创建者、被分享、被@用户能够查询到数据', !(done)->
    (xiaodong) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
    (wangyu) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
    (weike) <-! socket-helper.get-client {uid: 'uid-4', logged-in: true}
    request-data = {ipsid: 'ipsid-1', skip: 0, limit: 10}

    waiter = new utils.All-done-waiter done
    waiter1 = waiter.add-waiting-function!
    waiter2 = waiter.add-waiting-function!
    waiter3 = waiter.add-waiting-function!
    waiter4 = waiter.add-waiting-function!

    xiaodong.interesting-points-channel.emit 'retrieve-comments', request-data, !(data)->
      data.comments.length.should.above 0
      waiter1!
    baixin.interesting-points-channel.emit 'retrieve-comments', request-data, !(data)->
      data.comments.length.should.above 0
      waiter2!
    wangyu.interesting-points-channel.emit 'retrieve-comments', request-data, !(data)->
      data.comments.length.should.above 0
      waiter3!
    weike.interesting-points-channel.emit 'retrieve-comments', request-data, !(data)->
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      waiter4!

  can '若没有设置last-access-time，可以根据skip, limit, sort获取历史数据', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-2', skip: 0, limit: 3}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'comments'
    data.comments.length.should.below 4
    oldest-comment = data.comments[*-1]
    (data) <-! channels.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-2', skip: 0, limit: 3, sort: 0}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'comments'
    data.comments.length.should.below 4
    newest-comment = data.comments[*-1]
    (newest-comment.create-time > oldest-comment.create-time).should.be.true
    done!

  can '若设置了last-access-time，可以根据last-access-time和limit获取最新数据', !(done)->
    last-access-time = '' + new Date
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-2', last-access-time: last-access-time, skip: 1000, limit: 3}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'comments'
    data.comments.length.should.below 4
    random-index = (Math.random! * data.comments.length) .>>. 0
    (data.comments[random-index].create-time > JSON.stringify(new Date last-access-time)).should.be.true
    done!

  can '若查询内容中有匿名评论，该匿名评论的创建者信息会被隐藏', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'retrieve-comments', {ipsid: 'ipsid-3', skip: 0, limit: 1}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    data.should.have.property 'comments'
    data.comments.0.is-anonymous.should.be.true
    data.comments.0.should.have.property 'sendBy'
    data.comments.0.send-by.username.should.eql '匿名用户'
    data.comments.0.send-by._id.should.eql ''
    done!
