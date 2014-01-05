(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/watch-interesting-point-sessions/fixture/';
  describe('integrated test -- watch-interesting-point-sessions', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/watch-interesting-point-sessions', ['users', 'locations', 'interesting-point-sessions', 'interesting-points'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给出错误信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('watch-interesting-point-sessions', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('用户未登录时，能够给回未登录提示', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件watch-interesting-point-sessions需要登录才能完成'
          });
          done();
        });
      });
    });
    can('请求关注的会话不存在时，能够给回出错提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['inexistence-ipsid']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('请求关注的会话中有重复时，能够自动过滤重复并正常操作', function(done){
      socketHelper.getClient({
        uid: 'uid-3',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit("watch-interesting-point-sessions", {
          ipsids: ['ipsid-1', 'ipsid-1']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    describe('关注成功后', function(){
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
            done();
          });
        });
      });
      can('操作者能够收到操作成功提示', function(done){
        wangyu.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('操作者能够收到会话中的内容更新的消息推送', function(done){
        wangyu.interestingPointsChannel.on('push-comment-updated-in-watching-session', function(data){
          data.should.have.property('type', 'added');
          data.should.have.property('addedComment');
          done();
        });
        wangyu.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(){
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){});
        });
      });
      can('被关注的会话中能够查询到操作者的信息', function(done){
        wangyu.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(){
          weike.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
            ipid: 'ipid-1',
            skip: 0,
            limit: 10
          }, function(data){
            var randomIndex;
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('interestingPointSessions')['with'].length(2);
            randomIndex = Math.random() * data.interestingPointSessions.length >> 0;
            data.interestingPointSessions[randomIndex].watchedBy.should.include(wangyuInfo.uid);
            done();
          });
        });
      });
      can('再次关注同一个会话，可以正常操作', function(done){
        wangyu.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(){
          wangyu.interestingPointsChannel.emit('watch-interesting-point-sessions', {
            ipsids: ['ipsid-1', 'ipsid-2']
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            done();
          });
        });
      });
    });
  });
}).call(this);
