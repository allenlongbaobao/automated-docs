(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-attended-users/fixture/';
  describe('unit test -- retrieve-attended-users', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-attended-users', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回错误提示', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.locationsChannel.emit('retrieve-attended-users', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('报文正确时', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      can('若用户未登录，只能获取参与兴趣点的用户列表', function(done){
        socketHelper.getClient({
          loggedIn: false,
          urls: ['http://www.some.com']
        }, function(channels, responseData){
          channels.locationsChannel.emit('retrieve-attended-users', {
            lid: responseData.locationsChannel.locations[0]._id
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('users')['with'].length(2);
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.include(xiaodongInfo.uid);
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.include(weikeInfo.uid);
            done();
          });
        });
      });
      can('若用户已登录, 可以获取相关的私有兴趣点的参与用户列表', function(done){
        socketHelper.getClient(baixinInfo, function(channels, responseData){
          channels.locationsChannel.emit('retrieve-attended-users', {
            lid: responseData.locationsChannel.locations[0]._id
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('users')['with'].length(3);
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.include(xiaodongInfo.uid);
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.include(weikeInfo.uid);
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.include(wangyuInfo.uid);
            done();
          });
        });
      });
    });
  });
}).call(this);
