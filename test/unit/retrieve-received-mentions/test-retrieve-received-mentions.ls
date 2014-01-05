# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/retrieve-received-mentions/fixture/'

describe 'unit test -- retrieve-received-mentions', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/retrieve-received-mentions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-mentions', {haha: false}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-mentions', {type: 'wrong type'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回出错信息', !(done)->
    (client) <-! socket-helper.get-client {logged-in: false}
    (data) <-! client.interesting-points-channel.emit 'retrieve-received-mentions', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  describe '正常请求时', !->
    baixin = null
    before-each !(done)->
      (baixin-channel) <-! socket-helper.get-client {logged-in: true, uid: 'uid-2'}
      baixin := baixin-channel
      done!

    # 下面的测例中，我们设定：
    # 1. 小东创建了兴趣点ipid-1和会话ipsid-1，并且在兴趣点中@到了柏信
    # 2. 王瑜在会话ipsid-1中创建了评论cid-1和cid-2，都@到了柏信
    # 3. 伟科在评论cid-1中创建了回复rid-1和rid-2，在cid-2中创建了回复rid-3，都@到了柏信
    # 4. 其中，柏信读过了rid-1和cid-2中的@消息
    can '能够得到正确的数据格式', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {}
      data.should.have.property 'result', 'success'
      data.should.have.property 'errors' .with.length 0
      data.should.have.property 'receivedMentions'
      random-index = (Math.random! * data.received-mentions.length) .>>. 0
      data.received-mentions[random-index].should.have.property 'mentionType'
      done!

    can '能够通过skip和limit限制返回的数据', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {skip: 0, limit: 3}
      data.received-mentions.length.should.not.above 3
      the-third-mention = data.received-mentions.2
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {skip: 2, limit: 2}
      data.received-mentions.length.should.not.above 2
      data.received-mentions.0._id.should.eql the-third-mention._id
      done!

    can '能够通过from获取由特定用户发送的消息列表', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {from: 'uid-3'}
      data.received-mentions.length.should.above 0
      for data.received-mentions then
        if ..mention-type is 'interesting-point' then ..created-by._id.should.eql 'uid-3'
        else ..send-by._id.should.eql 'uid-3'
      done!

    can '能够通过type来获取不同类型的@消息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {type: 'interesting-point'}
      data.received-mentions.length.should.above 0
      for data.received-mentions then ..mention-type.should.eql 'interesting-point'
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {type: 'comment'}
      data.received-mentions.length.should.above 0
      for data.received-mentions then ..mention-type.should.eql 'comment'
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {type: 'reply'}
      data.received-mentions.length.should.above 0
      for data.received-mentions then ..mention-type.should.eql 'reply'
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {type: 'all'}
      data.received-mentions.length.should.above 0
      (_.uniq [..mention-type for data.received-mentions]).length.should.eql 3 # 有三种类型
      done!

    can '能够通过unread来决定获取是否未读的@消息', !(done)->
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {unread: true}
      data.received-mentions.length.should.eql 4
      (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {unread: false}
      data.received-mentions.length.should.eql 6
      done!
