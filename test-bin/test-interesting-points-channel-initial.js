(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/interesting-points-channel-initial/fixture/';
  describe('integrated test -- interesting-points-channel-initial', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/interesting-points-channel-initial', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('未登录时，能够正常初始化，不返回任何数据', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels, responseData){
        responseData.interestingPointsChannel.should.eql({});
        done();
      });
    });
    describe('登录时', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, requestCreateANewInterestingPointSession, requestCreateANewComment, requestCreateANewReply;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true
      };
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true
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
        textContent: 'xxx',
        voiceContent: 'xx',
        isAnonymous: false
      };
      requestCreateANewReply = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        rMid: 'cid-1',
        type: 'ip-rpl',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xx',
        isAnonymous: false
      };
      beforeEach(function(done){
        socketHelper.getClient(baixinInfo, function(baixinChannel){
          baixinChannel.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
            baixinChannel.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
              baixinChannel.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
                done();
              });
            });
          });
        });
      });
      can('能够正常初始化，不返回任何数据', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong, responseData){
          responseData.interestingPointsChannel.should.eql({});
          done();
        });
      });
      can('能够加入到创建、关注的兴趣点的room中', function(done){
        var createdInterestingPointSession;
        createdInterestingPointSession = null;
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            xiaodong.interestingPointsChannel.on('push-session-updated-in-created-interesting-point', function(data){
              setTimeout(function(){
                data.should.have.property('type', 'added');
                data.should.have.property('addedInterestingPointSession');
                data.addedInterestingPointSession.should.eql(createdInterestingPointSession);
                done();
              }, 100);
            });
            wangyu.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
              createdInterestingPointSession = data.createdInterestingPointSession;
            });
          });
        });
      });
      can('能够加入到创建、关注的会话的room中', function(done){
        var createdComment;
        createdComment = null;
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            xiaodong.interestingPointsChannel.on('push-comment-updated-in-created-session', function(data){
              setTimeout(function(){
                data.should.have.property('type', 'added');
                data.should.have.property('addedComment');
                data.addedComment.should.eql(createdComment);
                done();
              }, 100);
            });
            wangyu.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
              createdComment = data.createdComment;
            });
          });
        });
      });
      can('能够加入到创建的评论的room中', function(done){
        var createdReply, count;
        createdReply = null;
        count = 0;
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            xiaodong.interestingPointsChannel.on('push-reply-updated-in-created-comment', function(data){
              setTimeout(function(){
                data.should.have.property('type', 'added');
                data.should.have.property('addedReply');
                data.addedReply.should.eql(createdReply);
                done();
              }, 100);
            });
            wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
              createdReply = data.createdReply;
            });
          });
        });
      });
    });
  });
}).call(this);
