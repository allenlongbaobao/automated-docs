(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/report-reply-updated-in-created-comment/fixture/';
  describe('unit test -- report-reply-updated-in-created-comment', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/report-reply-updated-in-created-comment', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
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
        channels.interestingPointsChannel.emit('report-reply-updated-in-created-comment', {}, function(data){
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
        channels.interestingPointsChannel.emit('report-reply-updated-in-created-comment', {
          cid: 'cid'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件report-reply-updated-in-created-comment需要登录才能完成'
          });
          done();
        });
      });
    });
    describe('请求成功后', function(){
      can('请求成功后，下次不会收到消息提示', function(done){
        socketHelper.getClient({
          uid: 'uid-2',
          loggedIn: true
        }, function(baixin){
          baixin.interestingPointsChannel.emit('retrieve-received-replies', {
            unread: true
          }, function(data){
            data.receivedReplies.length.should.above(0);
            baixin.interestingPointsChannel.emit('report-reply-updated-in-created-comment', {
              cid: 'cid-1'
            }, function(data){
              data.should.have.property('result', 'success');
              data.should.have.property('errors')['with'].length(0);
              baixin.interestingPointsChannel.emit('retrieve-received-replies', {
                unread: true
              }, function(data){
                data.receivedReplies.length.should.eql(0);
                done();
              });
            });
          });
        });
      });
    });
  });
}).call(this);
