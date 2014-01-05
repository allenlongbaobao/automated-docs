# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/report-reply-updated-in-created-comment/fixture/'

describe 'unit test -- report-reply-updated-in-created-comment', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/report-reply-updated-in-created-comment', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'report-reply-updated-in-created-comment', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'report-reply-updated-in-created-comment', {cid: 'cid'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件report-reply-updated-in-created-comment需要登录才能完成'}
    done!

  describe '请求成功后', !->
    # 在下面的所有测例中，我们设定：
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信在会话ipsid-1中创建了评论cid-1
    # 3. 王瑜在评论cid-1中创建了回复rid-1

    can '请求成功后，下次不会收到消息提示', !(done)->
      (baixin) <-! socket-helper.get-client {uid: 'uid-2', logged-in: true}
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {unread: true}
      data.received-replies.length.should.above 0
      (data) <-! baixin.interesting-points-channel.emit 'report-reply-updated-in-created-comment', {cid: 'cid-1'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-replies', {unread: true}
      data.received-replies.length.should.eql 0
      done!
