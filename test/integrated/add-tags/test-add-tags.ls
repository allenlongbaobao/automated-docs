# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'integrated/add-tags/fixture/'

describe 'integrated test -- add-tags', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'integrated/add-tags', ['users', 'locations', 'interesting-points'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  can '请求报文出错时，能够给回提示信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'add-tags', {}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '用户未登录时，能够给回未登录提示', !(done)->
    (channels) <-! socket-helper.get-client {logged-in: false}
    (data) <-! channels.interesting-points-channel.emit 'add-tags', {ipid: 'ipid-1', tags: ['中大']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.should.include-eql {message: '事件add-tags需要登录才能完成'}
    done!

  can '兴趣点不存在时，能够给回出错信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'add-tags', {ipid: 'inexistence-ipid', tags: ['中大']}
    data.should.have.property 'result', 'failed'
    data.should.have.property 'errors'
    data.errors.length.should.above 0
    done!

  can '成功添加标签后，能够得到返回信息', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'add-tags', {ipid: 'ipid-1', tags: ['中大']}
    data.should.have.property 'result', 'success'
    data.should.have.property 'errors' .with.length 0
    done!

  can '成功添加标签后，能够查询到标签', !(done)->
    (channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
    (data) <-! channels.interesting-points-channel.emit 'add-tags', {ipid: 'ipid-1', tags: ['中大', '人文', '学术']}
    (data) <-! channels.locations-channel.emit 'retrieve-interesting-points', {lid: 'lid-1', offset: 0, count: 10}
    interesting-pont = [.. for data.interesting-points when .._id is 'ipid-1'][0]
    interesting-pont.tags.should.include '中大'
    interesting-pont.tags.should.include '人文'
    interesting-pont.tags.should.include '学术'
    done!
