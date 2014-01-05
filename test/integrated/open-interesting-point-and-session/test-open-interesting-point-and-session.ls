# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/open-interesting-point-and-session/fixture/'

describe 'integrated test -- open-interesting-point-and-session', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/open-interesting-point-and-session', ['locations', 'interesting-points', 'interesting-point-sessions', 'users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '请求过程中', !->

    can '若请求报文出错，能够返回出错信息', !(done)->
      (channels, response-data) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'open-interesting-point-and-session', {}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    can '若打开的兴趣点不存在，能够给出错误提示', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'inexistence-ipid', ipsid: 'ipsid-1'}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

    can '若打开的兴趣点会话不存在，能够给出错误提示', !(done)->
      (channels) <-! socket-helper.get-client {uid: 'uid-3', logged-in: true}
      (data) <-! channels.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'inexistence-ipsid'}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'failed'
      data.errors.length.should.above 0
      done!

  describe '成功完成操作后', !->
    # 在这个测例中，我们设定：
    # 1. 王瑜打开了兴趣点ipid-1和兴趣点会话ipsid-1
    # 2. 柏信在ipid-1中创建了一个新的会话
    # 3. 伟科在ipsid-1中创建一条评论
    wangyu-info = {uid: 'uid-3', logged-in: true}
    baixin-info = {uid: 'uid-2', logged-in: true}
    weike-info = {uid: 'uid-4', logged-in: true}
    wangyu = baixin = weike = null
    request-create-a-new-interesting-point-session = ipid: 'ipid-1', title: 'just a title..'
    request-create-a-new-comment =
      type: 'ips-msg'
      ipid: 'ipid-1'
      ipsid: 'ipsid-1'
      original-content-type: 'text'
      text-content: 'all right..'
      voice-content: '/voice/xxx'
      is-anonymous: false

    before-each !(done)->
      (wangyu-channel) <-! socket-helper.get-client wangyu-info
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (weike-channel) <-! socket-helper.get-client weike-info

      wangyu := wangyu-channel
      baixin := baixin-channel
      weike := weike-channel
      done!

    can '操作者能够收到反馈信息', !(done)->
      (data) <-! wangyu.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'ipsid-1'}
      data.should.have.property 'result'
      data.should.have.property 'errors'
      data.result.should.eql 'success'
      data.errors.length.should.eql 0
      done!

    can '操作者能够收到兴趣点会话更新的消息推送', !(done)->
      wangyu.interesting-points-channel.on 'push-session-updated-in-opening-interesting-point', !(data)->
        done!
      (data) <-! wangyu.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'ipsid-1'}
      (data) <-! baixin.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session

    can '操作者能够收到评论的更新消息', !(done)->
      wangyu.interesting-points-channel.on 'push-comment-updated-in-opening-session', !(data)->
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedComment'
        done!
      (data) <-! wangyu.interesting-points-channel.emit 'open-interesting-point-and-session', {ipid: 'ipid-1', ipsid: 'ipsid-1'}
      (data) <-! weike.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
