# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/open-comment/fixture/'

describe 'integrated test -- open-comment', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/open-comment', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'open-comment', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '若打开的评论不存在时，能够给回错误信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'open-comment', {cid: 'inexistence-cid'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '成功打开后', !->
    # 在这个测例中，我们设定：
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信在会话ipsid-1中创建了评论cid-1
    # 3. 王瑜打开了评论cid-1
    # 4. 伟科在评论cid-1中创建了回复
    wangyu-info = {uid: 'uid-3', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    wangyu = weike = null
    request-create-a-new-reply = {ipid: 'ipid-1', ipsid: 'ipsid-1', r-mid: 'cid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'xxx', voice-content: 'xxx', is-anonymous: false}
    before-each !(done)->
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (weike-channel) <-! socket-helper.get-client weike-info
      wangyu := wangyu-channel
      weike :=  weike-channel

      done!

    can '操作者能够收到反馈信息', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'open-comment', {cid: 'cid-1'}
      data.should.have.property 'result','success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '操作者能够收到回复的更新消息', !(done)->
      created-reply = null
      wangyu.interesting-points-channel.on 'push-reply-updated-in-opening-comment', !(data)->
        <-! set-timeout _, 100
        data.added-reply.should.eql created-reply
        done!
      (data) <-! wangyu.interesting-points-channel.emit 'open-comment', {cid: 'cid-1'}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      created-reply := data.created-reply
