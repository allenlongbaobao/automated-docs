(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/unwatch-interesting-points/fixture/';
  describe('integrated test -- unwatch-interesting-points', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/unwatch-interesting-points', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
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
        channels.interestingPointsChannel.emit('unwatch-interesting-points', {}, function(data){
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
        channels.interestingPointsChannel.emit('unwatch-interesting-points', {
          ipids: ['ipid-1']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件unwatch-interesting-points需要登录才能完成'
          });
          done();
        });
      });
    });
    can('取消关注的兴趣点点不存在时，能够正常操作', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('unwatch-interesting-points', {
          ipids: ['inexistence-ipid']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    can('取消关注的兴趣点没有记录时，能够继续操作', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('unwatch-interesting-points', {
          ipids: ['ipid-1']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    describe('成功取消关注后', function(){
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
            baixin.interestingPointsChannel.emit('watch-interesting-points', {
              ipids: ['ipid-1', 'ipid-2']
            }, function(data){
              if (data.result === 'success') {
                done();
              }
            });
          });
        });
      });
      can('操作者能够收到操作成功的消息提示', function(done){
        baixin.interestingPointsChannel.emit('unwatch-interesting-points', {
          ipids: ['ipid-1', 'ipid-2']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('操作者不会再收到该兴趣点的会话更新消息', function(done){
        baixin.interestingPointsChannel.on('push-session-updated-in-watching-interesting-point', function(data){
          data.should.have.property('type', 'added');
          data.should.have.property('addedInterestingPointSession');
          data.addedInterestingPointSession.should.have.property('ipid', 'ipid-2');
          setTimeout(function(){
            done();
          }, 100);
        });
        baixin.interestingPointsChannel.emit('unwatch-interesting-points', {
          ipids: ['ipid-1']
        }, function(){
          weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
            ipid: 'ipid-1',
            title: 'test'
          }, function(){
            weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
              ipid: 'ipid-2',
              title: 'test'
            }, function(){});
          });
        });
      });
      can('对应的兴趣点的关注列表能够删除操作者的信息', function(done){
        baixin.interestingPointsChannel.emit('unwatch-interesting-points', {
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
            data.interestingPoints[randomIndex].watchedBy.should.not.include(baixinInfo.uid);
            done();
          });
        });
      });
    });
  });
}).call(this);
