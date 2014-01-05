(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//retrieve-requested-friends/fixture/';
  describe('unit/ test -- retrieve-requested-friends', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-requested-friends', ['users'], done);
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
        urls: ['http://www.some.com']
      };
      can('用户获取被请求的好友， 返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-requested-friends', {}, function(data){
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
        urls: ['http://www.some.com']
      };
      can('用户获取被请求的好友， 返回正确的信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('retrieve-requested-friends', {}, function(data){
            data.should.have.property('result', 'success');
            done();
          });
        });
      });
    });
  });
}).call(this);
