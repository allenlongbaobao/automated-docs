# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/watch-interesting-point-sessions/fixture/'

describe 'integrated test -- watch-interesting-point-sessions', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/watch-interesting-point-sessions', ['users', 'locations', 'interesting-point-sessions', 'interesting-points'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给出错误信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'watch-interesting-point-sessions', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件watch-interesting-point-sessions需要登录才能完成'}
    done!

  can '请求关注的会话不存在时，能够给回出错提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['inexistence-ipsid']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '请求关注的会话中有重复时，能够自动过滤重复并正常操作', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit "watch-interesting-point-sessions", {ipsids: ['ipsid-1', 'ipsid-1']}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    done!

  describe '关注成功后', !->
    # 在这个测例中，我们设定：
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信在兴趣点ipid-1中创建了护花ipsid-2
    # 3. 王瑜关注了 ipsid-1 和 ipsid-2
    # 4. 伟科在ipsid-1和ipsid-2中分别创建了评论和回复
    wangyu-info = {uid: 'uid-3', logged-in: true}
    weike-info  = {uid: 'uid-4', logged-in: true}
    wangyu = weike = null

    request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    request-create-a-new-reply = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false

    before-each !(done)->
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info

      wangyu := wangyu-channel
      weike := weike-channel
      done!

    can '操作者能够收到操作成功提示', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '操作者能够收到会话中的内容更新的消息推送', !(done)->
      wangyu.interesting-points-channel.on 'push-comment-updated-in-watching-session', !(data)->
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedComment'
        done!

      <-! wangyu.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment

    can '被关注的会话中能够查询到操作者的信息', !(done)->
      <-! wangyu.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      (data) <-! weike.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'interestingPointSessions' .with.length 2 # ipsid-1和ipsid-2
      random-index = (Math.random! * data.interesting-point-sessions.length) .>>. 0
      data.interesting-point-sessions[random-index].watched-by.should.include wangyu-info.uid
      done!

    can '再次关注同一个会话，可以正常操作', !(done)->
      <-! wangyu.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      (data) <-! wangyu.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!
