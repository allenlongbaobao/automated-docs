(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//retrieve-rejected-friends/fixture/';
  describe('unit/ test -- retrieve-rejected-friends', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-rejected-friends', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('用户未登录时', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: false,
        urls: ['www.some.com']
      };
      can('用户获取被拒绝的好友，返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-rejected-friends', {}, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('用户登录时', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['www.some.com']
      };
      can('用户获取被拒绝的好友，返回正确信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-rejected-friends', {}, function(data){
            data.should.have.property('result', 'success');
            data.rejectedFriends[0].should.have.property('_id');
            data.rejectedFriends[0].should.have.property('username');
            data.rejectedFriends[0].should.have.property('gender');
            data.rejectedFriends[0].should.have.property('email');
            data.rejectedFriends[0].should.have.property('avatar');
            data.rejectedFriends[0].should.have.property('signature');
            done();
          });
        });
      });
    });
  });
}).call(this);
