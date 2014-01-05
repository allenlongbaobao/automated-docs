# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit/report-new-mention-in-interesting-point/fixture/'

describe 'unit test -- report-new-mention-in-interesting-point', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit/report-new-mention-in-interesting-point', ['users', 'interesting-points', 'locations'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回错误提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: true, uid: 'uid-1'}
    (data) <-! channels.interesting-points-channel.emit 'report-new-mention-in-interesting-point', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'report-new-mention-in-interesting-point', {ipid: 'ipid-1'}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.have.include-eql {message: '事件report-new-mention-in-interesting-point需要登录才能完成'}
    done!

  # 在这个测例中，我们设定：
  # 1. 小东创建了兴趣点ipid-1并且@到了柏信
  can '用户完成操作后，能收到成功提示并且下次登录不会收到消息', !(done)->
    baixin-info = {uid: 'uid-2', logged-in: true}
    (baixin) <-! socket-helper.get-client baixin-info
    (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {unread: true, type: 'interesting-point'}
    data.received-mentions.length.should.above 0
    (data) <-! baixin.interesting-points-channel.emit 'report-new-mention-in-interesting-point', {ipid: 'ipid-1'}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    (data) <-! baixin.interesting-points-channel.emit 'retrieve-received-mentions', {unread: true, type: 'interesting-point'}
    data.received-mentions.length.should.eql 0
    done!
