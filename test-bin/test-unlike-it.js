(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/unlike-it/fixture/';
  describe('integrated test -- unlike-it', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/unlike-it', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
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
      }, function(client){
        client.interestingPointsChannel.emit('unlike-it', {}, function(data){
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
      }, function(client){
        client.interestingPointsChannel.emit('unlike-it', {
          type: 'interesting-point',
          id: 'xxx'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('请求的数据不存在时，能够给回出错信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(client){
        var allType, randomIndex;
        allType = ['interesting-point', 'interesting-point-session', 'comment', 'reply'];
        randomIndex = Math.random() * allType.length >> 0;
        client.interestingPointsChannel.emit('unlike-it', {
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
    describe('成功取消点赞后', function(){
      var client;
      client = null;
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          client = channels;
          client.interestingPointsChannel.emit('like-it', {
            type: 'interesting-point',
            id: 'ipid-1'
          }, function(){
            client.interestingPointsChannel.emit('like-it', {
              type: 'interesting-point-session',
              id: 'ipsid-1'
            }, function(){
              client.interestingPointsChannel.emit('like-it', {
                type: 'comment',
                id: 'cid-1'
              }, function(){
                client.interestingPointsChannel.emit('like-it', {
                  type: 'reply',
                  id: 'rid-1'
                }, function(){
                  done();
                });
              });
            });
          });
        });
      });
      can('能够收到正确的返回信息', function(done){
        client.interestingPointsChannel.emit('unlike-it', {
          type: 'interesting-point',
          id: 'ipid-1'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('查询兴趣点不会出现数据', function(done){
        client.locationsChannel.emit('retrieve-interesting-points', {
          lid: 'lid-1',
          offset: 0,
          count: 10
        }, function(data){
          var interestingPointBeforeOperate;
          interestingPointBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.interestingPoints).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === 'ipid-1') {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          client.interestingPointsChannel.emit('unlike-it', {
            type: 'interesting-point',
            id: 'ipid-1'
          }, function(data){
            client.locationsChannel.emit('retrieve-interesting-points', {
              lid: 'lid-1',
              offset: 0,
              count: 10
            }, function(data){
              var interestingPointAfterOperate;
              interestingPointAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.interestingPoints).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'ipid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              interestingPointBeforeOperate.likedBy.length.should.eql(interestingPointAfterOperate.likedBy.length + 1);
              done();
            });
          });
        });
      });
      can('查询会话不会出现数据', function(done){
        client.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: 'ipid-1',
          skip: 0,
          limit: 10
        }, function(data){
          var interestingPointSessionBeforeOperate;
          interestingPointSessionBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.interestingPointSessions).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === 'ipsid-1') {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          client.interestingPointsChannel.emit('unlike-it', {
            type: 'interesting-point-session',
            id: 'ipsid-1'
          }, function(data){
            client.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
              ipid: 'ipid-1',
              skip: 0,
              limit: 10
            }, function(data){
              var interestingPointSessionAfterOperate;
              interestingPointSessionAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.interestingPointSessions).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'ipsid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              interestingPointSessionBeforeOperate.likedBy.length.should.eql(interestingPointSessionAfterOperate.likedBy.length + 1);
              done();
            });
          });
        });
      });
      can('查询评论不会出现数据', function(done){
        client.interestingPointsChannel.emit('retrieve-comments', {
          ipsid: 'ipsid-1',
          skip: 0,
          limit: 10
        }, function(data){
          var commentBeforeOperate;
          commentBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.comments).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === 'cid-1') {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          client.interestingPointsChannel.emit('unlike-it', {
            type: 'comment',
            id: 'cid-1'
          }, function(data){
            client.interestingPointsChannel.emit('retrieve-comments', {
              ipsid: 'ipsid-1',
              skip: 0,
              limit: 10
            }, function(data){
              var commentAfterOperate;
              commentAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.comments).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'cid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              commentBeforeOperate.likedBy.length.should.eql(commentAfterOperate.likedBy.length + 1);
              done();
            });
          });
        });
      });
      can('查询回复不会出现数据', function(done){
        client.interestingPointsChannel.emit('retrieve-replies', {
          cid: 'cid-1',
          skip: 0,
          limit: 10
        }, function(data){
          var replyBeforeOperate;
          replyBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.replies).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === 'rid-1') {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          client.interestingPointsChannel.emit('unlike-it', {
            type: 'reply',
            id: 'rid-1'
          }, function(data){
            client.interestingPointsChannel.emit('retrieve-replies', {
              cid: 'cid-1',
              skip: 0,
              limit: 10
            }, function(data){
              var replyAfterOperate;
              replyAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.replies).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'rid-1') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              replyBeforeOperate.likedBy.length.should.eql(replyAfterOperate.likedBy.length + 1);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
