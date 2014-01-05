# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/close-interesting-point-and-session/fixture/'

describe 'integrated test -- close-interesting-point-and-session', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/close-interesting-point-and-session', ['locations', 'interesting-points', 'interesting-point-sessions', 'users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'close-interesting-point-and-session', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '请求关闭的兴趣点不存在时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'close-interesting-point-and-session', {ipid: 'inexistence-ipid', ipsid: 'ipsid-1'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '请求关闭的兴趣点会话不存在时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'close-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'inexistence-ipsid'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '成功关闭兴趣点和会话后', !->
    # 在这个测例中，我们设定:
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信打开ipid-1和ipsid-1
    # 3. 柏信关闭了ipid-1和ipsid-1
    baixin-info = {uid: 'uid-2', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    baixin = weike = null
    request-close-interesting-point-and-session = ipid: 'ipid-1', ipsid: 'ipsid-1'
    request-create-a-new-interesting-point-session = ipid: 'ipid-1', title: 'test'
    request-create-a-new-comment = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'test', voice-content: 'xxx', is-anonymous: false
    request-create-a-new-reply = ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'test', voice-content: 'xxx', is-anonymous: false

    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (weike-channel) <-! socket-helper.get-client weike-info
      baixin := baixin-channel
      weike := weike-channel

      (data) <-! baixin.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'ipsid-1'}
      done! if data.result is 'success'

    can '操作者能够收到操作成功消息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'close-interesting-point-and-session', request-close-interesting-point-and-session
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '操作者无法再接收到兴趣点会话的更新消息', !(done)->
      baixin.interesting-points-channel.on 'push-session-udpated-opening-interesting-point', !(data)->
        data.should.fail '操作者收到了兴趣点会话更新消息'

      <-! baixin.interesting-points-channel.emit 'close-interesting-point-and-session', request-close-interesting-point-and-session
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      <-! set-timeout _, 200 # 保证有足够时间验证push-session-udpated-opening-interesting-point是否被触发
      done!

    can '操作者无法再接受到兴趣点会话中评论的更新消息', !(done)->
      baixin.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
        data.should.fail '操作者收到了评论的更新'
      (data) <-! baixin.interesting-points-channel.emit 'close-interesting-point-and-session', request-close-interesting-point-and-session
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      <-! set-timeout _, 200 # 保证有足够的事件验证 push-comment-updated-in-opening-session 和 push-reply-updated-in-opening-session 是否被触发
      done!
