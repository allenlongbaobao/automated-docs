(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-interesting-point-sessions/fixture/';
  describe('unit test -- retrieve-interesting-point-sessions', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-interesting-point-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
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
      }, function(channels, responseData){
        channels.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {}, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.result.should.eql('failed');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('若所在的兴趣点不存在，返回错误信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels, responseData){
        channels.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: 'inexistence-interesting-point-id',
          skip: 0,
          limit: 10
        }, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.result.should.eql('failed');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('若所在的兴趣点是私有的，只有创建者、被分享、被@的用户能够查询到数据', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(xiaodong){
        socketHelper.getClient({
          uid: 'uid-2',
          loggedIn: true
        }, function(baixin){
          socketHelper.getClient({
            uid: 'uid-3',
            loggedIn: true
          }, function(wangyu){
            socketHelper.getClient({
              uid: 'uid-4',
              loggedIn: true
            }, function(weike){
              var requestData, waiter, waiter1, waiter2, waiter3, waiter4;
              requestData = {
                ipid: 'ipid-1',
                skip: 0,
                limit: 10
              };
              waiter = new utils.AllDoneWaiter(done);
              waiter1 = waiter.addWaitingFunction();
              waiter2 = waiter.addWaitingFunction();
              waiter3 = waiter.addWaitingFunction();
              waiter4 = waiter.addWaitingFunction();
              xiaodong.interestingPointsChannel.emit('retrieve-interesting-point-sessions', requestData, function(data){
                data.interestingPointSessions.length.should.above(0);
                waiter1();
              });
              baixin.interestingPointsChannel.emit('retrieve-interesting-point-sessions', requestData, function(data){
                data.interestingPointSessions.length.should.above(0);
                waiter2();
              });
              wangyu.interestingPointsChannel.emit('retrieve-interesting-point-sessions', requestData, function(data){
                data.interestingPointSessions.length.should.above(0);
                waiter3();
              });
              weike.interestingPointsChannel.emit('retrieve-interesting-point-sessions', requestData, function(data){
                data.result.should.eql('failed');
                data.errors.length.should.above(0);
                waiter4();
              });
            });
          });
        });
      });
    });
    can('若没有设置last-access-time，可以根据skip, limit, sort获取历史数据', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: 'ipid-2',
          skip: 0,
          limit: 3,
          lastAccessTime: ''
        }, function(data){
          var oldestSession, ref$;
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('interestingPointSessions');
          data.result.should.equal('success');
          data.errors.length.should.eql(0);
          data.interestingPointSessions.length.should.below(4);
          oldestSession = (ref$ = data.interestingPointSessions)[ref$.length - 1];
          channels.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
            ipid: 'ipid-2',
            skip: 0,
            limit: 3,
            lastAccessTime: '',
            sort: 0
          }, function(data){
            var newestSession, ref$;
            data.should.have.property('result');
            data.should.have.property('errors');
            data.should.have.property('interestingPointSessions');
            data.result.should.equal('success');
            data.errors.length.should.eql(0);
            data.interestingPointSessions.length.should.below(4);
            newestSession = (ref$ = data.interestingPointSessions)[ref$.length - 1];
            (newestSession.createTime > oldestSession.createTime).should.be['true'];
            done();
          });
        });
      });
    });
    can('若设置了last-access-time，可以根据LAT和limit获取最新数据', function(done){
      var lastAccessTime;
      lastAccessTime = '' + new Date;
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: 'ipid-2',
          skip: 10000,
          limit: 3,
          lastAccessTime: lastAccessTime
        }, function(data){
          var randomIndex;
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('interestingPointSessions');
          data.result.should.eql('success');
          data.errors.length.should.eql(0);
          data.interestingPointSessions.length.should.below(4);
          randomIndex = Math.random() * data.interestingPointSessions.length >> 0;
          (data.interestingPointSessions[randomIndex].createTime > JSON.stringify(new Date(lastAccessTime))).should.be['true'];
          done();
        });
      });
    });
  });
}).call(this);
