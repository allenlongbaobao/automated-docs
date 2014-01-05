(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-received-replies/fixture/';
  describe('unit test -- retrieve-received-replies', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-received-replies', ['messages', 'users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够返回出错数据', function(done){
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1'
      }, function(client){
        client.interestingPointsChannel.emit('retrieve-received-replies', {
          haha: false
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('用户未登录时，能够返回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(client){
        client.interestingPointsChannel.emit('retrieve-received-replies', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('正常请求时', function(){
      var baixin;
      baixin = null;
      beforeEach(function(done){
        socketHelper.getClient({
          loggedIn: true,
          uid: 'uid-2'
        }, function(baixinChannel){
          baixin = baixinChannel;
          done();
        });
      });
      can('能够返回正确的数据格式', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-replies', {}, function(data){
          var i$, x$, ref$, len$;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          for (i$ = 0, len$ = (ref$ = data.receivedReplies).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            x$.should.have.property('url');
            x$.should.have.property('sessionIndex');
            x$.should.have.property('commentIndex');
            x$.should.have.property('replyIndex');
          }
          done();
        });
      });
      can('能够根据skip和limit获取正确的数据', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-replies', {
          skip: 0,
          limit: 3
        }, function(data){
          var theThirdReply;
          data.receivedReplies.length.should.not.above(3);
          theThirdReply = data.receivedReplies[2];
          baixin.interestingPointsChannel.emit('retrieve-received-replies', {
            skip: 2,
            limit: 3
          }, function(data){
            data.receivedReplies.length.should.not.above(3);
            data.receivedReplies[0]._id.should.eql(theThirdReply._id);
            done();
          });
        });
      });
      can('能够根据from获取特定用户的消息', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-replies', {
          from: 'uid-3'
        }, function(data){
          var i$, x$, ref$, len$;
          data.receivedReplies.length.should.eql(3);
          for (i$ = 0, len$ = (ref$ = data.receivedReplies).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            x$.sendBy._id.should.eql('uid-3');
          }
          baixin.interestingPointsChannel.emit('retrieve-received-replies', {
            from: 'uid-4'
          }, function(data){
            var i$, x$, ref$, len$;
            data.receivedReplies.length.should.eql(2);
            for (i$ = 0, len$ = (ref$ = data.receivedReplies).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              x$.sendBy._id.should.eql('uid-4');
            }
            done();
          });
        });
      });
      can('能够根据unread获取未读的消息', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-replies', {
          unread: true
        }, function(data){
          data.receivedReplies.length.should.eql(3);
          baixin.interestingPointsChannel.emit('retrieve-received-replies', {
            unread: true,
            from: 'uid-3'
          }, function(data){
            data.receivedReplies.length.should.eql(2);
            baixin.interestingPointsChannel.emit('retrieve-received-replies', {
              unread: false
            }, function(data){
              data.receivedReplies.length.should.eql(5);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
