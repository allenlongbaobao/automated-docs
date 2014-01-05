(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-active-friends/fixture/';
  describe('unit test -- retrieve-active-friends', function(){
    var xiaodong;
    xiaodong = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-active-friends', ['users'], done);
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
      can('获取正式好友， 返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-active-friends', {}, function(activeFriends){
            activeFriends.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('用户登录', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['www.some.com']
      };
      can('获取正式好友， 返回正确信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-active-friends', {}, function(activeFriends){
            activeFriends.should.have.property('result', 'success');
            activeFriends.should.have.property('activeFriends');
            activeFriends.activeFriends[0].should.have.property('name');
            activeFriends.activeFriends[0].should.have.property('users');
            activeFriends.activeFriends[0].users[0].should.have.property('_id');
            activeFriends.activeFriends[0].users[0].should.have.property('username');
            activeFriends.activeFriends[0].users[0].should.have.property('gender');
            activeFriends.activeFriends[0].users[0].should.have.property('email');
            activeFriends.activeFriends[0].users[0].should.have.property('avatar');
            activeFriends.activeFriends[0].users[0].should.have.property('signature');
            activeFriends.activeFriends[0].users[0].should.have.property('status');
            done();
          });
        });
      });
    });
  });
}).call(this);
