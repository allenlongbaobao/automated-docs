# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/interesting-points-channel-initial/fixture/'

describe 'integrated test -- interesting-points-channel-initial', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/interesting-points-channel-initial', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!


  can '未登录时，能够正常初始化，不返回任何数据', !(done)->
    (channels, response-data) <-! socket-helper.get-client {logged-in: false}
    response-data.interesting-points-channel.should.eql {}
    done!

  describe '登录时', !->
    # 在这个测例中，我们设定：
    # 1. 小东创建了兴趣点ipid-1、会话ipsid-1和评论cid-1
    # 2. 柏信在ipid-1中创建了会话
    # 3. 柏信在ipsid-1中创建了评论
    # 4. 柏信在cid-1中创建了回复
    xiaodong-info = {uid: 'uid-1', logged-in: true}
    baixin-info = {uid: 'uid-2', logged-in: true}
    wangyu-info = {uid: 'uid-3', logged-in: true}

    request-create-a-new-interesting-point-session = {ipid: 'ipid-1', title: 'test'}
    request-create-a-new-comment = {ipid: 'ipid-1', ipsid: 'ipsid-1', type: 'ips-msg', original-content-type: 'text', text-content: 'xxx', voice-content: 'xx', is-anonymous: false}
    request-create-a-new-reply = {ipid: 'ipid-1', ipsid: 'ipsid-1', r-mid: 'cid-1', type: 'ip-rpl', original-content-type: 'text', text-content: 'xxx', voice-content: 'xx', is-anonymous: false}

    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client baixin-info
      (data) <-! baixin-channel.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session
      (data) <-! baixin-channel.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment
      (data) <-! baixin-channel.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply

      done!

    can '能够正常初始化，不返回任何数据', !(done)->
      (xiaodong, response-data) <-! socket-helper.get-client xiaodong-info
      response-data.interesting-points-channel.should.eql {}
      done!

    can '能够加入到创建、关注的兴趣点的room中', !(done)->
      created-interesting-point-session = null
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info
      xiaodong.interesting-points-channel.on 'push-session-updated-in-created-interesting-point', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedInterestingPointSession'
        data.added-interesting-point-session.should.eql created-interesting-point-session
        done!
      wangyu.interesting-points-channel.emit 'create-a-new-interesting-point-session', request-create-a-new-interesting-point-session, !(data)->
        created-interesting-point-session := data.created-interesting-point-session

    can '能够加入到创建、关注的会话的room中', !(done)->
      created-comment = null
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info
      xiaodong.interesting-points-channel.on 'push-comment-updated-in-created-session', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedComment'
        data.added-comment.should.eql created-comment
        done!
      wangyu.interesting-points-channel.emit 'create-a-new-comment', request-create-a-new-comment, !(data)->
        created-comment := data.created-comment

    can '能够加入到创建的评论的room中', !(done)->
      created-reply = null
      count = 0
      (xiaodong) <-! socket-helper.get-client xiaodong-info
      (wangyu) <-! socket-helper.get-client wangyu-info
      xiaodong.interesting-points-channel.on 'push-reply-updated-in-created-comment', !(data)->
        <-! set-timeout _, 100
        data.should.have.property 'type', 'added'
        data.should.have.property 'addedReply'
        data.added-reply.should.eql created-reply
        done!
      wangyu.interesting-points-channel.emit 'create-a-new-reply', request-create-a-new-reply, !(data)->
        created-reply := data.created-reply
