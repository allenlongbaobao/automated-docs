(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/open-interesting-point-and-session/fixture/';
  describe('integrated test -- open-interesting-point-and-session', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/open-interesting-point-and-session', ['locations', 'interesting-points', 'interesting-point-sessions', 'users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('请求过程中', function(){
      can('若请求报文出错，能够返回出错信息', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels, responseData){
          channels.interestingPointsChannel.emit('open-interesting-point-and-session', {}, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('若打开的兴趣点不存在，能够给出错误提示', function(done){
        socketHelper.getClient({
          uid: 'uid-3',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('open-interesting-point-and-session', {
            ipid: 'inexistence-ipid',
            ipsid: 'ipsid-1'
          }, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('若打开的兴趣点会话不存在，能够给出错误提示', function(done){
        socketHelper.getClient({
          uid: 'uid-3',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('open-interesting-point-and-session', {
            ipid: 'ipid-1',
            ipsid: 'inexistence-ipsid'
          }, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
    });
    describe('成功完成操作后', function(){
      var wangyuInfo, baixinInfo, weikeInfo, wangyu, baixin, weike, requestCreateANewInterestingPointSession, requestCreateANewComment;
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true
      };
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      wangyu = baixin = weike = null;
      requestCreateANewInterestingPointSession = {
        ipid: 'ipid-1',
        title: 'just a title..'
      };
      requestCreateANewComment = {
        type: 'ips-msg',
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        originalContentType: 'text',
        textContent: 'all right..',
        voiceContent: '/voice/xxx',
        isAnonymous: false
      };
      beforeEach(function(done){
        socketHelper.getClient(wangyuInfo, function(wangyuChannel){
          socketHelper.getClient(baixinInfo, function(baixinChannel){
            socketHelper.getClient(weikeInfo, function(weikeChannel){
              wangyu = wangyuChannel;
              baixin = baixinChannel;
              weike = weikeChannel;
              done();
            });
          });
        });
      });
      can('操作者能够收到反馈信息', function(done){
        wangyu.interestingPointsChannel.emit('open-interesting-point-and-session', {
          ipid: 'ipid-1',
          ipsid: 'ipsid-1'
        }, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.result.should.eql('success');
          data.errors.length.should.eql(0);
          done();
        });
      });
      can('操作者能够收到兴趣点会话更新的消息推送', function(done){
        wangyu.interestingPointsChannel.on('push-session-updated-in-opening-interesting-point', function(data){
          done();
        });
        wangyu.interestingPointsChannel.emit('open-interesting-point-and-session', {
          ipid: 'ipid-1',
          ipsid: 'ipsid-1'
        }, function(data){
          baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){});
        });
      });
      can('操作者能够收到评论的更新消息', function(done){
        wangyu.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
          data.should.have.property('type', 'added');
          data.should.have.property('addedComment');
          done();
        });
        wangyu.interestingPointsChannel.emit('open-interesting-point-and-session', {
          ipid: 'ipid-1',
          ipsid: 'ipsid-1'
        }, function(data){
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){});
        });
      });
    });
  });
}).call(this);
