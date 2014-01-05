(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/like-it/fixture/';
  describe('integrated test -- like-it', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/like-it', ['users', 'locations', 'interesting-point-sessions', 'interesting-points', 'messages'], done);
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
        channels.interestingPointsChannel.emit('like-it', {}, function(data){
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
        channels.interestingPointsChannel.emit('like-it', {
          type: 'interesting-point',
          id: 'xxx'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件like-it需要登录才能完成'
          });
          done();
        });
      });
    });
    can('请求的数据不存在时，能够给回错误提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        var allType, randomIndex;
        allType = ['interesting-point', 'interesting-point-session', 'comment', 'reply'];
        randomIndex = Math.random() * allType.length >> 0;
        channels.interestingPointsChannel.emit('like-it', {
          type: allType[randomIndex],
          id: 'inexistence-id'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('成功点赞后', function(){
      can('能够收到操作成功消息', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('like-it', {
            type: 'interesting-point',
            id: 'ipid-1'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            done();
          });
        });
      });
      can('对兴趣点点赞后，能够被查询到', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('like-it', {
            type: 'interesting-point',
            id: 'ipid-1'
          }, function(data){
            channels.locationsChannel.emit('retrieve-interesting-points', {
              lid: 'lid-1',
              offset: 0,
              count: 10
            }, function(data){
              var interestingPoint;
              interestingPoint = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.interestingPoints).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'ipid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              interestingPoint.should.have.property('likedBy');
              interestingPoint.likedBy.should.include('uid-1');
              done();
            });
          });
        });
      });
      can('对会话点赞后，能够被查询到', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('like-it', {
            type: 'interesting-point-session',
            id: 'ipsid-1'
          }, function(data){
            channels.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
              ipid: 'ipid-1',
              skip: 0,
              limit: 10
            }, function(data){
              var interestingPointSession;
              interestingPointSession = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.interestingPointSessions).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'ipsid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              interestingPointSession.should.have.property('likedBy');
              interestingPointSession.likedBy.should.include('uid-1');
              done();
            });
          });
        });
      });
      can('对评论点赞后，能够被查询到', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('like-it', {
            type: 'comment',
            id: 'cid-1'
          }, function(data){
            channels.interestingPointsChannel.emit('retrieve-comments', {
              ipsid: 'ipsid-1',
              skip: 0,
              limit: 10
            }, function(data){
              var comment;
              comment = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.comments).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'cid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              comment.should.have.property('likedBy');
              comment.likedBy.should.include('uid-1');
              done();
            });
          });
        });
      });
      can('对回复点赞后，能够被查询到', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('like-it', {
            type: 'reply',
            id: 'rid-1'
          }, function(data){
            channels.interestingPointsChannel.emit('retrieve-replies', {
              cid: 'cid-1',
              skip: 0,
              limit: 10
            }, function(data){
              var reply;
              reply = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.replies).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'rid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              reply.should.have.property('likedBy');
              reply.likedBy.should.include('uid-1');
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
