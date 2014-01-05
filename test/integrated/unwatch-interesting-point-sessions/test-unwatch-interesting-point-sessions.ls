# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/unwatch-interesting-point-sessions/fixture/'

describe 'integrated test -- unwatch-interesting-point-sessions', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/unwatch-interesting-point-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'unwatch-interesting-point-sessions', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录信息', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'unwatch-interesting-point-sessions', {ipsids: ['ipsid-1']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件unwatch-interesting-point-sessions需要登录才能完成'}
    done!

  can '取消关注的会话不存在时，能够正常操作', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'unwatch-interesting-point-sessions', {ipsids: ['inexistence-ipsid', 'ipsid-1']}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    done!

  can '取消关注的会话没有记录时，能够继续操作', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'unwatch-interesting-point-sessions', {ipsids: ['ipsid-2', 'ipsid-1']}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    done!

  describe '成功取消关注后', !->
    # 在这个测例中，我们设定:
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信在兴趣点ipid-1中创建了会话ipsid-2
    # 3. 王瑜关注了会话ipsid-1和ipsid-2
    # 4. 伟科分别在会话ipsid-1和ipsid-2中创建评论和回复
    wangyu-info = {uid: 'uid-3', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    wangyu = weike = null

    request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false
    request-create-a-new-reply = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false

    before-each !(done)->
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info

      wangyu := wangyu-channel
      weike := weike-channel

      (data) <-! wangyu.interesting-points-channel.emit 'watch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      done! if data.result is 'success'

    can '操作者能够接收到成功操作消息', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'unwatch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '操作者不会再接收到该会话中的评论更新', !(done)->
      wangyu.interesting-points-channel.on 'push-comment-updated-in-watching-session', !(data)->
        data.should.fail '取消关注了会话的用户收到了评论的推送'
      (data) <-! wangyu.interesting-points-channel.emit 'unwatch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      <-! set-timeout _, 100 # 保证有足够时间验证push-comment-updated-in-watching-session是否被触发
      done!

    can '对应的会话的关注列表中会删除操作者的信息', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      data.should.have.property 'interestingPointSessions' .with.length 2 # ipsid-1和ipsid-2
      random-index = (Math.random! * data.interesting-point-sessions.length) .>>. 0
      data.interesting-point-sessions[random-index].watched-by.should.include wangyu-info.uid # 未取消关注前，包含有王瑜的信息
      (data) <-! wangyu.interesting-points-channel.emit 'unwatch-interesting-point-sessions', {ipsids: ['ipsid-1', 'ipsid-2']}
      (data) <-! wangyu.interesting-points-channel.emit 'retrieve-interesting-point-sessions', {ipid: 'ipid-1', skip: 0, limit: 10}
      data.should.have.property 'interestingPointSessions' .with.length 2 # ipsid-1和ipsid-2
      random-index = (Math.random! * data.interesting-point-sessions.length) .>>. 0
      data.interesting-point-sessions[random-index].watched-by.should.not.include wangyu-info.uid # 取消关注后，不包含王瑜的信息
      done!
