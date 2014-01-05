(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/disconnect/fixture/';
  describe('unit test -- disconnect', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/disconnect', ['users', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('能够通知同一个location的其他用户', function(done){
      var waiter, waiter1, waiter2;
      waiter = new utils.AllDoneWaiter(done);
      waiter1 = waiter.addWaitingFunction();
      waiter2 = waiter.addWaitingFunction();
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1',
        urls: ['http://www.some.com', 'http://www.not-in-database.com']
      }, function(creator){
        socketHelper.getClient({
          loggedIn: false,
          urls: ['http://www.not-in-database.com']
        }, function(observer1){
          socketHelper.getClient({
            loggedIn: false,
            urls: ['http://www.some.com']
          }, function(observer2){
            observer1.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', '');
              data.location.should.have.property('url', 'http://www.not-in-database.com');
              data.should.have.property('user');
              data.user.should.have.property('_id', 'uid-1');
              data.should.have.property('action', 'leave');
              waiter1();
            });
            observer2.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.location.should.have.property('url', '');
              data.should.have.property('user');
              data.user.should.have.property('_id', 'uid-1');
              data.should.have.property('action', 'leave');
              waiter2();
            });
            creator.defaultChannel.socket.disconnect();
          });
        });
      });
    });
    can('能够通知在用户曾经参与的location的其他用户', function(done){
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1'
      }, function(creator){
        socketHelper.getClient({
          loggedIn: false,
          urls: ['http://www.some.com']
        }, function(observer1){
          socketHelper.getClient({
            loggedIn: false,
            urls: ['http://www.not-in-database.com']
          }, function(observer2){
            observer1.locationsChannel.on('push-attended-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.should.have.property('user');
              data.user.should.have.property('_id', 'uid-1');
              data.user.should.have.property('status', 'offline');
              setTimeout(function(){
                done();
              }, 100);
            });
            observer2.locationsChannel.on('push-attended-user-updated', function(data){
              data.should.fail('非参与location的其他用户收到了消息推送');
            });
            creator.defaultChannel.socket.disconnect();
          });
        });
      });
    });
  });
}).call(this);
