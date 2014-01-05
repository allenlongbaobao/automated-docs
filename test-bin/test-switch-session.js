(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/switch-session/fixture/';
  describe('integrated test -- switch-session', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/switch-session', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够返回出错信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('switch-session', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('请求切换的会话不存在时，能够给回出错信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('switch-session', {
          newIpsid: 'inexistence-ipsid',
          oldIpsid: 'ipsid-1'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('切换会话成功后', function(){
      var baixinInfo, weikeInfo, baixin, weike, requestCreateANewCommentInNewSession, requestCreateANewCommentInOldSession;
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      baixin = weike = null;
      requestCreateANewCommentInNewSession = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-2',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'test',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      requestCreateANewCommentInOldSession = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'test',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      beforeEach(function(done){
        socketHelper.getClient(baixinInfo, function(baixinChannel){
          socketHelper.getClient(weikeInfo, function(weikeChannel){
            baixin = baixinChannel;
            weike = weikeChannel;
            baixin.interestingPointsChannel.emit('open-interesting-point-and-session', {
              ipid: 'ipid-1',
              ipsid: 'ipsid-1'
            }, function(data){
              if (data.result === 'success') {
                done();
              }
            });
          });
        });
      });
      can('操作者能够收到返回的操作成功提示', function(done){
        baixin.interestingPointsChannel.emit('switch-session', {
          newIpsid: 'ipsid-2',
          oldIpsid: 'ipsid-1'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('操作者能够收到新的session的评论更新', function(done){
        var waiter, waiter1, waiter2, waiter3;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        baixin.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
          data.should.have.property('type', 'added');
          data.should.have.property('addedComment');
          waiter1();
        });
        baixin.interestingPointsChannel.emit('switch-session', {
          newIpsid: 'ipsid-2',
          oldIpsid: 'ipsid-1'
        }, function(data){
          waiter2();
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewCommentInNewSession, function(data){
            waiter3();
          });
        });
      });
      can('操作者不会收到旧的session的评论更新', function(done){
        baixin.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
          data.should.fail('操作者收到了之前的session的评论推送');
        });
        baixin.interestingPointsChannel.emit('switch-session', {
          newIpsid: 'ipsid-2',
          oldIpsid: 'ipsid-1'
        }, function(data){
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewCommentInOldSession, function(data){
            setTimeout(function(){
              done();
            }, 200);
          });
        });
      });
      can('操作者仍然可以收到该兴趣点的会话更新', function(done){
        baixin.interestingPointsChannel.on('push-session-updated-in-opening-interesting-point', function(data){
          data.should.have.property('type', 'added');
          data.should.have.property('addedInterestingPointSession');
          data.addedInterestingPointSession.should.have.property('ipid', 'ipid-1');
          data.addedInterestingPointSession.should.have.property('title', 'test');
          done();
        });
        baixin.interestingPointsChannel.emit('switch-session', {
          newIpsid: 'ipsid-2',
          oldIpisd: 'ipsid-1'
        }, function(data){
          weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
            ipid: 'ipid-1',
            title: 'test'
          }, function(data){});
        });
      });
    });
  });
}).call(this);
