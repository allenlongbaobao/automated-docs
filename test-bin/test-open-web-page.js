(function(){
  var FIXTURE_PATH, requestCreateANewWebInterestingPointOnANewUrl;
  FIXTURE_PATH = 'integrated/open-web-page/fixture/';
  requestCreateANewWebInterestingPointOnANewUrl = utils.loadFixture(FIXTURE_PATH + 'request-create-a-new-web-interesting-point-on-a-new-url');
  describe('integrated test -- open-web-page', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/open-web-page', ['users', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.locationsChannel.emit('open-web-page', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('若打开的页面无法找到数据', function(){
      can('能够返回空对象', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(channels){
          channels.locationsChannel.emit('open-web-page', {
            url: 'http://www.not-in-database.com'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('openedWebPage');
            data.openedWebPage.should.eql({});
            done();
          });
        });
      });
      can('其他用户在此页面中新建兴趣点，能够收到location更新消息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient({
          loggedIn: false
        }, function(observer){
          socketHelper.getClient({
            uid: 'uid-1',
            loggedIn: true
          }, function(creator){
            observer.locationsChannel.on('push-location-updated', function(data){
              data.should.have.property('_id');
              data.should.have.property('type', 'web');
              data.should.have.property('urls');
              data.urls.should.include('http://www.not-in-database.com');
              waiter1();
            });
            creator.locationsChannel.on('ask-location-internality', function(data){
              creator.locationsChannel.emit('answer-location-internality', {
                lid: data.lid,
                result: 'success',
                isInternal: false
              }, function(data){});
            });
            observer.locationsChannel.emit('open-web-page', {
              url: 'http://www.not-in-database.com'
            }, function(data){
              requestCreateANewWebInterestingPointOnANewUrl.withinLocation.url = 'http://www.not-in-database.com';
              creator.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
                waiter2();
              });
            });
          });
        });
      });
      can('通知在同一个location的其他用户', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(creator){
          socketHelper.getClient({
            loggedIn: false,
            urls: ['http://www.not-in-database.com']
          }, function(observer){
            observer.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', '');
              data.location.should.have.property('url', 'http://www.not-in-database.com');
              data.should.have.property('user');
              data.user.should.have.property('_id', 'uid-1');
              data.user.should.have.property('username', 'xiaodong');
              data.should.have.property('action', 'join');
              done();
            });
            creator.locationsChannel.emit('open-web-page', {
              url: 'http://www.not-in-database.com'
            }, function(data){
              data.should.have.property('result', 'success');
            });
          });
        });
      });
    });
    describe('若打开的页面能够找到数据', function(){
      can('能够返回正确的信息', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(channels){
          channels.locationsChannel.emit('open-web-page', {
            url: 'http://www.some.com'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('openedWebPage');
            data.openedWebPage.should.have.property('_id', 'lid-1');
            done();
          });
        });
      });
      can('其他用户在此页面中新建兴趣点，能够收到兴趣点更新消息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient({
          loggedIn: false
        }, function(observer){
          socketHelper.getClient({
            uid: 'uid-1',
            loggedIn: true
          }, function(creator){
            observer.locationsChannel.on('push-interesting-point-updated', function(data){
              data.should.have.property('type', 'added');
              data.should.have.property('addedInterestingPoint');
              waiter1();
            });
            observer.locationsChannel.emit('open-web-page', {
              url: 'http://www.some.com'
            }, function(data){
              var ref$;
              ref$ = requestCreateANewWebInterestingPointOnANewUrl.withinLocation;
              ref$.lid = data.openedWebPage._id;
              ref$.url = data.openedWebPage.urls[0];
              creator.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPointOnANewUrl, function(data){
                waiter2();
              });
            });
          });
        });
      });
      can('通知在同一个location的其他用户', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(creator){
          socketHelper.getClient({
            loggedIn: false,
            urls: ['http://www.some.com']
          }, function(observer){
            observer.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.location.should.have.property('url', '');
              data.should.have.property('user');
              data.user.should.have.property('_id', 'uid-1');
              data.user.should.have.property('username', 'xiaodong');
              data.should.have.property('action', 'join');
              done();
            });
            creator.locationsChannel.emit('open-web-page', {
              url: 'http://www.some.com'
            }, function(data){
              data.should.have.property('result', 'success');
            });
          });
        });
      });
    });
  });
}).call(this);
