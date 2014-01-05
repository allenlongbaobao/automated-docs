# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = 'unit//at-activity/fixture/'

# 小东 
# 柏信
# 柏信的弟弟
describe 'unit/ test -- at-activity', !->
  xiaodong = null
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture 'unit//at-activity', ['users'], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!

  describe '小东@ 人', !->
    before-each !(done)->
      (xiaodong-channels) <-! socket-helper.get-client {uid: 'uid-1', logged-in: true}
      xiaodong := xiaodong-channels
      done!

    can '小东@ 之后， 输入柏, 返回柏信和柏信de弟弟', !(done)->
      xiaodong.users-channel.emit 'retrieve-matched-friends-name-with-part-name', {part-name: '柏'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.have.property 'matchedFriendsName' .with.length-of 2
        done!

    can '小东@ 之后， 输入信, 返回柏信和柏信de弟弟', !(done)->
      xiaodong.users-channel.emit 'retrieve-matched-friends-name-with-part-name', {part-name: '信'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.have.property 'matchedFriendsName' .with.length-of 2
        done!

    can '小东@ 之后， 输入王, 返回匹配到的用户为空', !(done)->
      xiaodong.users-channel.emit 'retrieve-matched-friends-name-with-part-name', {part-name: '王'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.have.property 'matchedFriendsName' .with.length-of 0
        done!

    can '小东@之后， 输入弟弟, 返回柏信de弟弟', !(done)->
      xiaodong.users-channel.emit 'retrieve-matched-friends-name-with-part-name', {part-name: '弟弟'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.have.property 'matchedFriendsName' .with.length-of 1
        data.matched-friends-name.should.eql ['柏信de弟弟']
        done!

    can '小东@之后， 输入de, 返回柏信de弟弟', !(done)->
      xiaodong.users-channel.emit 'retrieve-matched-friends-name-with-part-name', {part-name: 'de'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.have.property 'matchedFriendsName' .with.length-of 1
        data.matched-friends-name.should.eql ['柏信de弟弟']
        done!

    can '小东@之后， 输入柏王, 返回匹配到的用户为空', !(done)->
      xiaodong.users-channel.emit 'retrieve-matched-friends-name-with-part-name', {part-name: '柏王'}, !(data)->
        data.should.have.property 'result', 'success'
        data.should.have.property 'matchedFriendsName' .with.length-of 0
        done!


