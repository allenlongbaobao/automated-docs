(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-active-users/fixture/';
  describe('unit test -- retrieve-active-users', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-active-users', ['locations', 'users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
  });
}).call(this);
