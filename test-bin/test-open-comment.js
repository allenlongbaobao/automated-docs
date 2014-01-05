(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/open-comment/fixture/';
  describe('integrated test -- open-comment', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/open-comment', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
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
        channels.interestingPointsChannel.emit('open-comment', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('若打开的评论不存在时，能够给回错误信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('open-comment', {
          cid: 'inexistence-cid'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('成功打开后', function(){
      var wangyuInfo, weikeInfo, wangyu, weike, requestCreateANewReply;
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      wangyu = weike = null;
      requestCreateANewReply = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        rMid: 'cid-1',
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
      can('操作者能够收到反馈信息', function(done){
        wangyu.interestingPointsChannel.emit('open-comment', {
          cid: 'cid-1'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('操作者能够收到回复的更新消息', function(done){
        var createdReply;
        createdReply = null;
        wangyu.interestingPointsChannel.on('push-reply-updated-in-opening-comment', function(data){
          setTimeout(function(){
            data.addedReply.should.eql(createdReply);
            done();
          }, 100);
        });
        wangyu.interestingPointsChannel.emit('open-comment', {
          cid: 'cid-1'
        }, function(data){
          weike.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
            createdReply = data.createdReply;
          });
        });
      });
    });
  });
}).call(this);
