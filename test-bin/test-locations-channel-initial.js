(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/locations-channel-initial/fixture/';
  describe('integrated test -- locations-channel-initial', function(){
    var xiaodongInfo, baixinInfo;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/locations-channel-initial', ['users', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    xiaodongInfo = {
      loggedIn: true,
      uid: 'uid-1',
      urls: ['http://www.some.com']
    };
    baixinInfo = {
      loggedIn: true,
      uid: 'uid-2',
      urls: ['http://www.some.com']
    };
    describe('不管是否登录', function(){
      var client, initialData;
      client = initialData = null;
      beforeEach(function(done){
        socketHelper.getClient({
          loggedIn: false,
          urls: ['http://www.some.com', 'http://www.not-in-database.com']
        }, function(channels, responseData){
          client = channels;
          initialData = responseData;
          done();
        });
      });
      can('能返回当前的位置信息', function(done){
        initialData.locationsChannel.should.have.property('locations');
        initialData.locationsChannel.should.have.property('inexistenceLocations');
        initialData.locationsChannel.inexistenceLocations.should.include('http://www.not-in-database.com');
        initialData.locationsChannel.locations.length.should.eql(1);
        initialData.locationsChannel.locations[0].urls.should.include('http://www.some.com');
        done();
      });
      can('能够加入到不存在数据的页面的room中', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        client.locationsChannel.on('push-active-user-updated', function(data){
          data.should.have.property('location');
          data.location.should.have.property('url', 'http://www.not-in-database.com');
          data.location.should.have.property('id', '');
          data.should.have.property('user');
          data.should.have.property('action', 'join');
          data.user.should.have.property('_id', 'uid-1');
          waiter1();
        });
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['http://www.not-in-database.com']
        }, function(creator){
          waiter2();
        });
      });
      can('能够加入到已存在数据的页面的room中', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        client.locationsChannel.on('push-active-user-updated', function(data){
          data.should.have.property('location');
          data.location.should.have.property('id', 'lid-1');
          data.location.should.have.property('url', '');
          data.should.have.property('user');
          data.should.have.property('action', 'join');
          data.user.should.have.property('_id', 'uid-1');
          waiter1();
        });
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['http://www.some.com']
        }, function(creator){
          waiter2();
        });
      });
    });
    describe('对于已经登录的情况', function(){
      can('能够通知同个location的其他用户', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(baixinInfo, function(baixin){
          baixin.locationsChannel.on('push-active-user-updated', function(data){
            data.should.have.property('location');
            data.location.should.have.property('id', 'lid-1');
            data.should.have.property('user');
            data.user.should.have.property('_id', xiaodongInfo.uid);
            data.user.should.have.property('username', 'xiaodong');
            data.should.have.property('action', 'join');
            waiter1();
          });
          socketHelper.getClient(xiaodongInfo, function(xiaodong){
            waiter2();
          });
        });
      });
      can('能够通知在用户曾经参与过的location的其他用户', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(baixinInfo, function(baixin){
          baixin.locationsChannel.on('push-attended-user-updated', function(data){
            data.should.have.property('location');
            data.location.should.have.property('id', 'lid-1');
            data.should.have.property('user');
            data.user.should.have.property('_id', xiaodongInfo.uid);
            data.user.should.have.property('username', 'xiaodong');
            data.user.should.have.property('status', 'online');
            waiter1();
          });
          socketHelper.getClient(xiaodongInfo, function(xiaodong){
            waiter2();
          });
        });
      });
    });
  });
}).call(this);
