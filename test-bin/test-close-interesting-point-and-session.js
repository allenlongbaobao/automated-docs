(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/close-interesting-point-and-session/fixture/';
  describe('integrated test -- close-interesting-point-and-session', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/close-interesting-point-and-session', ['locations', 'interesting-points', 'interesting-point-sessions', 'users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回错误提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('close-interesting-point-and-session', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('请求关闭的兴趣点不存在时，能够给回错误提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('close-interesting-point-and-session', {
          ipid: 'inexistence-ipid',
          ipsid: 'ipsid-1'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('请求关闭的兴趣点会话不存在时，能够给回错误提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('close-interesting-point-and-session', {
          ipid: 'ipid-1',
          ipsid: 'inexistence-ipsid'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('成功关闭兴趣点和会话后', function(){
      var baixinInfo, weikeInfo, baixin, weike, requestCloseInterestingPointAndSession, requestCreateANewInterestingPointSession, requestCreateANewComment, requestCreateANewReply;
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      baixin = weike = null;
      requestCloseInterestingPointAndSession = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1'
      };
      requestCreateANewInterestingPointSession = {
        ipid: 'ipid-1',
        title: 'test'
      };
      requestCreateANewComment = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'test',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      requestCreateANewReply = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        type: 'ip-rpl',
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
      can('操作者能够收到操作成功消息', function(done){
        baixin.interestingPointsChannel.emit('close-interesting-point-and-session', requestCloseInterestingPointAndSession, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('操作者无法再接收到兴趣点会话的更新消息', function(done){
        baixin.interestingPointsChannel.on('push-session-udpated-opening-interesting-point', function(data){
          data.should.fail('操作者收到了兴趣点会话更新消息');
        });
        baixin.interestingPointsChannel.emit('close-interesting-point-and-session', requestCloseInterestingPointAndSession, function(){
          weike.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
            setTimeout(function(){
              done();
            }, 200);
          });
        });
      });
      can('操作者无法再接受到兴趣点会话中评论的更新消息', function(done){
        baixin.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
          data.should.fail('操作者收到了评论的更新');
        });
        baixin.interestingPointsChannel.emit('close-interesting-point-and-session', requestCloseInterestingPointAndSession, function(data){
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
            setTimeout(function(){
              done();
            }, 200);
          });
        });
      });
    });
  });
}).call(this);
