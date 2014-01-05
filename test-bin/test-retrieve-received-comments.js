(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-received-comments/fixture/';
  describe('unit test -- retrieve-received-comments', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-received-comments', ['locations', 'users', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('报文异常时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1'
      }, function(client){
        client.interestingPointsChannel.emit('retrieve-received-comments', {
          haha: 'wrong..'
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
        client.interestingPointsChannel.emit('retrieve-received-comments', {}, function(data){
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
      can('能够得到正确的数据格式', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {}, function(data){
          var i$, x$, ref$, len$;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('receivedComments');
          for (i$ = 0, len$ = (ref$ = data.receivedComments).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            x$.should.have.property('url');
            x$.should.have.property('sessionIndex');
            x$.should.have.property('commentIndex');
          }
          done();
        });
      });
      can('能够通过skip和limit得到正确的数据', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
          skip: 0,
          limit: 3
        }, function(data){
          var theThirdComment;
          data.receivedComments.length.should.not.above(3);
          theThirdComment = data.receivedComments[2];
          xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
            skip: 2,
            limit: 3
          }, function(data){
            data.receivedComments.length.should.not.above(3);
            data.receivedComments[0]._id.should.eql(theThirdComment._id);
            done();
          });
        });
      });
      can('能够通过from获取特定用户的消息', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
          from: 'uid-3'
        }, function(data){
          var i$, x$, ref$, len$;
          data.receivedComments.length.should.eql(3);
          for (i$ = 0, len$ = (ref$ = data.receivedComments).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            x$.sendBy._id.should.eql('uid-3');
          }
          xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
            from: 'uid-4'
          }, function(data){
            var i$, x$, ref$, len$;
            data.receivedComments.length.should.eql(2);
            for (i$ = 0, len$ = (ref$ = data.receivedComments).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              x$.sendBy._id.should.eql('uid-4');
            }
            done();
          });
        });
      });
      can('能偶通过type获取特定类型的消息', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
          type: 'created'
        }, function(data){
          data.receivedComments.length.should.eql(3);
          xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
            type: 'watching'
          }, function(data){
            data.receivedComments.length.should.eql(2);
            xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
              type: 'all'
            }, function(data){
              data.receivedComments.length.should.eql(5);
              done();
            });
          });
        });
      });
      can('能够通过unread获取未读的消息', function(done){
        xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
          unread: true
        }, function(data){
          data.receivedComments.length.should.eql(3);
          xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
            unread: true,
            type: 'created'
          }, function(data){
            data.receivedComments.length.should.eql(2);
            xiaodong.interestingPointsChannel.emit('retrieve-received-comments', {
              unread: false
            }, function(data){
              data.receivedComments.length.should.eql(5);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
