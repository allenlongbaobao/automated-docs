(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/watch-interesting-points/fixture/';
  describe('integrated test -- watch-interesting-points', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/watch-interesting-points', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回出错信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('watch-interesting-points', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('用户未登录时，能够给出未登录提示', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件watch-interesting-points需要登录才能完成'
          });
          done();
        });
      });
    });
    can('关注的兴趣点不存在时，能够给回出错信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1', 'inexistence-ipid']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('关注的兴趣点中有私有兴趣点且操作者不是合法时，能够给回出错信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-3', 'ipid-1']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('成功关注后', function(){
      var baixinInfo, weikeInfo, baixin, weike;
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      baixin = weike = null;
      beforeEach(function(done){
        socketHelper.getClient(baixinInfo, function(baixinChannel){
          socketHelper.getClient(weikeInfo, function(weikeChannel){
            baixin = baixinChannel;
            weike = weikeChannel;
            done();
          });
        });
      });
      can('能够收到关注成功提示', function(done){
        baixin.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1', 'ipid-2']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('请求关注的兴趣点id有重复时，能够正常操作', function(done){
        baixin.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1', 'ipid-2', 'ipid-1', 'ipid-2']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('能够收到该兴趣点的会话更新', function(done){
        var waiter, waiter1, waiter2, count;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        count = 0;
        baixin.interestingPointsChannel.on('push-session-updated-in-watching-interesting-point', function(data){
          data.should.have.property('type', 'added');
          data.should.have.property('addedInterestingPointSession');
          if (++count === 2) {
            waiter1();
          }
        });
        baixin.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1', 'ipid-2']
        }, function(){
          weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
            ipid: 'ipid-1',
            title: 'test'
          }, function(){
            weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
              ipid: 'ipid-2',
              title: 'test'
            }, function(){
              waiter2();
            });
          });
        });
      });
      can('再次关注同一个兴趣点，可以正常操作', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.interestingPointsChannel.on('push-session-updated-in-watching-interesting-point', function(data){
          data.should.have.property('type', 'added');
          data.should.have.property('addedInterestingPointSession');
          waiter2();
        });
        baixin.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1', 'ipid-2']
        }, function(){
          baixin.interestingPointsChannel.emit('watch-interesting-points', {
            ipids: ['ipid-1']
          }, function(){
            weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
              ipid: 'ipid-1',
              title: 'test'
            }, function(){
              weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
                ipid: 'ipid-2',
                title: 'test'
              }, function(){
                waiter1();
              });
            });
          });
        });
      });
      can('兴趣点的关注列表中能够查询到操作者的信息', function(done){
        baixin.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1', 'ipid-2']
        }, function(data){
          baixin.locationsChannel.emit('retrieve-interesting-points', {
            lid: 'lid-1',
            offset: 0,
            count: 10
          }, function(data){
            var randomIndex;
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('interestingPoints')['with'].length(2);
            randomIndex = Math.random() * data.interestingPoints.length >> 0;
            data.interestingPoints[randomIndex].watchedBy.should.include(baixinInfo.uid);
            done();
          });
        });
      });
    });
  });
}).call(this);
