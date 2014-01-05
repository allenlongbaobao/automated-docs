(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/unwatch-interesting-point-sessions/fixture/';
  describe('integrated test -- unwatch-interesting-point-sessions', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/unwatch-interesting-point-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
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
        channels.interestingPointsChannel.emit('unwatch-interesting-point-sessions', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('用户未登录时，能够给回未登录信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('unwatch-interesting-point-sessions', {
          ipsids: ['ipsid-1']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件unwatch-interesting-point-sessions需要登录才能完成'
          });
          done();
        });
      });
    });
    can('取消关注的会话不存在时，能够正常操作', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('unwatch-interesting-point-sessions', {
          ipsids: ['inexistence-ipsid', 'ipsid-1']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    can('取消关注的会话没有记录时，能够继续操作', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('unwatch-interesting-point-sessions', {
          ipsids: ['ipsid-2', 'ipsid-1']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    describe('成功取消关注后', function(){
      var wangyuInfo, weikeInfo, wangyu, weike, requestCreateANewComment, requestCreateANewReply;
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      wangyu = weike = null;
      requestCreateANewComment = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      requestCreateANewReply = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        type: 'ip-rpl',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      beforeEach(function(done){
        socketHelper.getClient(wangyuInfo, function(wangyuChannel){
          socketHelper.getClient(weikeInfo, function(weikeChannel){
            wangyu = wangyuChannel;
            weike = weikeChannel;
            wangyu.interestingPointsChannel.emit('watch-interesting-point-sessions', {
              ipsids: ['ipsid-1', 'ipsid-2']
            }, function(data){
              if (data.result === 'success') {
                done();
              }
            });
          });
        });
      });
      can('操作者能够接收到成功操作消息', function(done){
        wangyu.interestingPointsChannel.emit('unwatch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('操作者不会再接收到该会话中的评论更新', function(done){
        wangyu.interestingPointsChannel.on('push-comment-updated-in-watching-session', function(data){
          data.should.fail('取消关注了会话的用户收到了评论的推送');
        });
        wangyu.interestingPointsChannel.emit('unwatch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(data){
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
            setTimeout(function(){
              done();
            }, 100);
          });
        });
      });
      can('对应的会话的关注列表中会删除操作者的信息', function(done){
        wangyu.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: 'ipid-1',
          skip: 0,
          limit: 10
        }, function(data){
          var randomIndex;
          data.should.have.property('interestingPointSessions')['with'].length(2);
          randomIndex = Math.random() * data.interestingPointSessions.length >> 0;
          data.interestingPointSessions[randomIndex].watchedBy.should.include(wangyuInfo.uid);
          wangyu.interestingPointsChannel.emit('unwatch-interesting-point-sessions', {
            ipsids: ['ipsid-1', 'ipsid-2']
          }, function(data){
            wangyu.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
              ipid: 'ipid-1',
              skip: 0,
              limit: 10
            }, function(data){
              var randomIndex;
              data.should.have.property('interestingPointSessions')['with'].length(2);
              randomIndex = Math.random() * data.interestingPointSessions.length >> 0;
              data.interestingPointSessions[randomIndex].watchedBy.should.not.include(wangyuInfo.uid);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
