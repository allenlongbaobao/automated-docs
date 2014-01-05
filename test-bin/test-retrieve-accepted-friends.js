(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//retrieve-accepted-friends/fixture/';
  describe('unit/ test -- retrieve-accepted-friends', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-accepted-friends', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('用户未登录', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: false,
        urls: ['www.some.com']
      };
      can('用户获取已接受的好友，返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-accepted-friends', {}, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('用户已登录', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['www.some.com']
      };
      can('用户获取已接受的好友，返回正确信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-accepted-friends', {}, function(data){
            data.should.have.property('result', 'success');
            data.acceptedFriends[0].should.have.property('_id');
            data.acceptedFriends[0].should.have.property('username');
            data.acceptedFriends[0].should.have.property('gender');
            data.acceptedFriends[0].should.have.property('email');
            data.acceptedFriends[0].should.have.property('avatar');
            data.acceptedFriends[0].should.have.property('signature');
            done();
          });
        });
      });
    });
  });
}).call(this);
