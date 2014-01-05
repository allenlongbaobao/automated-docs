(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-received-sessions/fixture/';
  describe('unit test -- retrieve-received-sessions', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-received-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1'
      }, function(client){
        client.interestingPointsChannel.emit('retrieve-received-sessions', {
          haha: false
        }, function(data){
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
      }, function(client){
        client.interestingPointsChannel.emit('retrieve-received-sessions', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('正常请求后', function(){
      var xiaodong;
      xiaodong = null;
      beforeEach(function(done){
        socketHelper.getClient({
          loggedIn: true,
          uid: 'uid-1'
        }, function(xiaodongChannel){
          xiaodong = xiaodongChannel;
          done();
        });
      });
      can('能够返回正确的数据格式', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {}, function(data){
          var i$, x$, ref$, len$;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('receivedSessions');
          for (i$ = 0, len$ = (ref$ = data.receivedSessions).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            x$.should.have.property('sessionIndex');
            x$.should.have.property('url');
          }
          done();
        });
      });
      can('能够通过skip和limit控制返回数据', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
          skip: 0,
          limit: 3
        }, function(data){
          var theThirdSession;
          data.receivedSessions.length.should.not.above(3);
          theThirdSession = data.receivedSessions[2];
          xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
            skip: 2,
            limit: 2
          }, function(data){
            data.receivedSessions.length.should.not.above(2);
            data.receivedSessions[0]._id.should.eql(theThirdSession._id);
            done();
          });
        });
      });
      can('能够通过from返回特定用户创建的消息', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
          from: 'uid-2'
        }, function(data){
          var i$, x$, ref$, len$;
          data.receivedSessions.length.should.above(0);
          for (i$ = 0, len$ = (ref$ = data.receivedSessions).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            x$.createdBy._id.should.eql('uid-2');
          }
          done();
        });
      });
      can('能够通过type返回特定类型的数据', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
          type: 'created'
        }, function(data){
          data.receivedSessions.length.should.eql(3);
          xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
            type: 'watching'
          }, function(data){
            data.receivedSessions.length.should.eql(4);
            xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
              type: 'all'
            }, function(data){
              data.receivedSessions.length.should.eql(7);
              done();
            });
          });
        });
      });
      can('能够通过unread返回未读的数据', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
          unread: true
        }, function(data){
          data.receivedSessions.length.should.eql(5);
          xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
            unread: true,
            type: 'created'
          }, function(data){
            data.receivedSessions.length.should.eql(2);
            xiaodong.interestingPointsChannel.emit('retrieve-received-sessions', {
              unread: false
            }, function(data){
              data.receivedSessions.length.should.eql(7);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
