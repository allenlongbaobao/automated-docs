(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//at-activity/fixture/';
  describe('unit/ test -- at-activity', function(){
    var xiaodong;
    xiaodong = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//at-activity', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('小东@ 人', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('小东@ 之后， 输入柏, 返回柏信和柏信de弟弟', function(done){
        xiaodong.usersChannel.emit('retrieve-matched-friends-name-with-part-name', {
          partName: '柏'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('matchedFriendsName')['with'].lengthOf(2);
          done();
        });
      });
      can('小东@ 之后， 输入信, 返回柏信和柏信de弟弟', function(done){
        xiaodong.usersChannel.emit('retrieve-matched-friends-name-with-part-name', {
          partName: '信'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('matchedFriendsName')['with'].lengthOf(2);
          done();
        });
      });
      can('小东@ 之后， 输入王, 返回匹配到的用户为空', function(done){
        xiaodong.usersChannel.emit('retrieve-matched-friends-name-with-part-name', {
          partName: '王'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('matchedFriendsName')['with'].lengthOf(0);
          done();
        });
      });
      can('小东@之后， 输入弟弟, 返回柏信de弟弟', function(done){
        xiaodong.usersChannel.emit('retrieve-matched-friends-name-with-part-name', {
          partName: '弟弟'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('matchedFriendsName')['with'].lengthOf(1);
          data.matchedFriendsName.should.eql(['柏信de弟弟']);
          done();
        });
      });
      can('小东@之后， 输入de, 返回柏信de弟弟', function(done){
        xiaodong.usersChannel.emit('retrieve-matched-friends-name-with-part-name', {
          partName: 'de'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('matchedFriendsName')['with'].lengthOf(1);
          data.matchedFriendsName.should.eql(['柏信de弟弟']);
          done();
        });
      });
      can('小东@之后， 输入柏王, 返回匹配到的用户为空', function(done){
        xiaodong.usersChannel.emit('retrieve-matched-friends-name-with-part-name', {
          partName: '柏王'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('matchedFriendsName')['with'].lengthOf(0);
          done();
        });
      });
    });
  });
}).call(this);
