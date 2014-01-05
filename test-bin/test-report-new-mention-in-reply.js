(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/report-new-mention-in-reply/fixture/';
  describe('unit test -- report-new-mention-in-reply', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/report-new-mention-in-reply', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回错误提示', function(done){
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1'
      }, function(channels){
        channels.interestingPointsChannel.emit('report-new-mention-in-reply', {}, function(data){
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
        channels.interestingPointsChannel.emit('report-new-mention-in-reply', {
          rid: 'rid-1'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.have.includeEql({
            message: '事件report-new-mention-in-reply需要登录才能完成'
          });
          done();
        });
      });
    });
    can('用户完成操作后，能收到成功提示并且下次登录不会收到消息', function(done){
      var baixinInfo;
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      socketHelper.getClient(baixinInfo, function(baixin){
        baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
          unread: true,
          type: 'reply'
        }, function(data){
          data.receivedMentions.length.should.above(0);
          baixin.interestingPointsChannel.emit('report-new-mention-in-reply', {
            rid: 'rid-1'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
              unread: true,
              type: 'reply'
            }, function(data){
              data.receivedMentions.length.should.eql(0);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
