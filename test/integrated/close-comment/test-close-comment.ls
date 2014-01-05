# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/close-comment/fixture/'

describe 'integrated test -- close-comment', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/close-comment', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给出错误信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'close-comment', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '请求关闭的评论不存在时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'close-comment', {cid: 'inexistence-cid'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '成功关闭评论后', !->
    # 在这个测例中， 我们设定：
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1
    # 2. 柏信在会话ipsid-1中创建了评论cid
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

      (data) <-! wangyu.interesting-points-channel.emit 'open-comment', {cid: 'cid-1'}
      done! if data.result is 'success'

    can '操作者能够收到成功提示', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'close-comment', {cid: 'cid-1'}
      data.should.have.property 'result','success'
      data.should.have.property 'errors' .with.length 0
      done!

    can '操作者不再收到该评论下的回复更新消息', !(done)->
      created-reply = null
      wangyu.interesting-points-channel.on 'push-reply-updated-in-opening-comment', !(data)->
        data.should.fail '操作者关闭了评论后还能收到回复的更新消息'

      (data) <-! wangyu.interesting-points-channel.emit 'close-comment', {cid: 'cid-1'}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply
      <-! set-timeout _, 100 # 确保有足够的时间验证push-reply-updated-in-opening-comment是否被触发
      done!
