# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/switch-session/fixture/'

describe 'integrated test -- switch-session', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/switch-session', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够返回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'switch-session', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '请求切换的会话不存在时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'switch-session', {new-ipsid: 'inexistence-ipsid', old-ipsid: 'ipsid-1'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '切换会话成功后', !->
    # 这个测例中，我们设定:
    # 1. 小东是兴趣点ipsid-1的创建者，并创建了两个会话ipsid-1和ipsid-2
    # 2. 柏信先打开了兴趣点ipid-1并进入到会话ipsid-1中
    # 3. 柏信从ipsid-1切换到ipsid-2
    baixin-info = {uid: 'uid-2', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    baixin = weike = null
    request-create-a-new-comment-in-new-session = {ipid: 'ipid-1', ipsid: 'ipsid-2', type: 'ips-msg', original-content-type: 'text', text-content: 'test', voice-content: 'xxx', is-anonymous: false}
    request-create-a-new-comment-in-old-session = {ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'test', voice-content: 'xxx', is-anonymous: false}

    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (weike-channel) <-! socket-helper.get-client weike-info

      baixin := baixin-channel
      weike := weike-channel

      (data) <-! baixin.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'ipsid-1'}
      done! if data.result is 'success'

    can '操作者能够收到返回的操作成功提示', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'switch-session', {new-ipsid: 'ipsid-2', old-ipsid: 'ipsid-1'}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '操作者能够收到新的session的评论更新', !(done)->
      waiter = new utils.All-done-waiter done
      waiter1 = waiter.add-waiting-function!
      waiter2 = waiter.add-waiting-function!
      waiter3 = waiter.add-waiting-function!
      baixin.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedComment'
        waiter1!
      (data) <-! baixin.interesting-points-channel.emit 'switch-session', {new-ipsid: 'ipsid-2', old-ipsid: 'ipsid-1'}
      waiter2!
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment-in-new-session
      waiter3!

    can '操作者不会收到旧的session的评论更新', !(done)->
      baixin.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
        data.should.fail '操作者收到了之前的session的评论推送'

      (data) <-! baixin.interesting-points-channel.emit 'switch-session', {new-ipsid: 'ipsid-2', old-ipsid: 'ipsid-1'}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment-in-old-session
      <-! set-timeout _, 200 # 确保有足够的时间验证 push-comment-updated-in-opening-session是否被触发
      done!

    can '操作者仍然可以收到该兴趣点的会话更新', !(done)->
      baixin.interesting-points-channel.on 'push-session-updated-in-opening-interesting-point', !(data)->
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedInterestingPointSession'
        data.added-interesting-point-session.should.have.property 'ipid', 'ipid-1'
        data.added-interesting-point-session.should.have.property 'title', 'test'
        done!
      (data) <-! baixin.interesting-points-channel.emit 'switch-session', {new-ipsid: 'ipsid-2', old-ipisd: 'ipsid-1'}
      weike.interesting-points-channel.emit 'create-a-new-interesting-point-session', {ipid: 'ipid-1', title: 'test'}, !(data)->
