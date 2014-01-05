(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/remove-interesting-point-sessions/fixture/';
  describe('integrated test -- remove-interesting-point-sessions', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/remove-interesting-point-sessions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回错误信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('remove-interesting-point-sessions', {}, function(data){
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
        channels.interestingPointsChannel.emit('remove-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件remove-interesting-point-sessions需要登录才能完成'
          });
          done();
        });
      });
    });
    can('请求删除的会话不存在时，能够给回错误提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('remove-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'inexistence-ipsid']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('删除过程中，操作者没有权限删除', function(){
      var baixinInfo, wangyuInfo, weikeInfo, baixin, wangyu, weike, requestCreateANewComment;
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      baixin = wangyu = weike = null;
      requestCreateANewComment = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-2',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'test',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      beforeEach(function(done){
        socketHelper.getClient(baixinInfo, function(baixinChannel){
          socketHelper.getClient(wangyuInfo, function(wangyuChannel){
            socketHelper.getClient(weikeInfo, function(weikeChannel){
              baixin = baixinChannel;
              wangyu = wangyuChannel;
              weike = weikeChannel;
              done();
            });
          });
        });
      });
      can('不是会话创建者时，能够给回错误提示', function(done){
        baixin.interestingPointsChannel.emit('remove-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
      can('会话中有用户评论过，删除时能够给回错误提示', function(done){
        weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          baixin.interestingPointsChannel.emit('remove-interesting-point-sessions', {
            ipsids: ['ipsid-2']
          }, function(data){
            data.should.have.property('result', 'failed');
            data.should.have.property('errors');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('会话被用户关注过，删除时能够给回错误提示', function(done){
        wangyu.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['ipsid-1', 'ipsid-2']
        }, function(data){
          baixin.interestingPointsChannel.emit('remove-interesting-point-sessions', {
            ipsids: ['ipsid-2']
          }, function(data){
            data.should.have.property('result', 'failed');
            data.should.have.property('errors');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
    });
    describe('成功删除会话后', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo, xiaodong, baixin, wangyu, weike;
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
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      xiaodong = baixin = wangyu = weike = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannel){
          socketHelper.getClient(baixinInfo, function(baixinChannel){
            socketHelper.getClient(wangyuInfo, function(wangyuChannel){
              socketHelper.getClient(weikeInfo, function(weikeChannel){
                xiaodong = xiaodongChannel;
                baixin = baixinChannel;
                wangyu = wangyuChannel;
                weike = weikeChannel;
                done();
              });
            });
          });
        });
      });
      can('能够返回操作成功消息', function(done){
        baixin.interestingPointsChannel.emit('remove-interesting-point-sessions', {
          ipsids: ['ipsid-2']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('会话所在的兴趣点创建者、订阅者、浏览者能够收到消息推送', function(done){
        var waiter, waiter1, waiter2, waiter3;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        xiaodong.interestingPointsChannel.on('push-session-updated-in-created-interesting-point', function(data){
          data.should.have.property('type', 'removed');
          data.should.have.property('removedInterestingPointSession');
          waiter1();
        });
        weike.interestingPointsChannel.on('push-session-updated-in-watching-interesting-point', function(data){
          data.should.have.property('type', 'removed');
          data.should.have.property('removedInterestingPointSession');
          waiter2();
        });
        wangyu.interestingPointsChannel.on('push-session-updated-in-opening-interesting-point', function(data){
          data.should.have.property('type', 'removed');
          data.should.have.property('removedInterestingPointSession');
          waiter3();
        });
        weike.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: ['ipid-1']
        }, function(){
          wangyu.interestingPointsChannel.emit('open-interesting-point-and-session', {
            ipid: 'ipid-1',
            ipsid: 'ipsid-1'
          }, function(){
            baixin.interestingPointsChannel.emit('remove-interesting-point-sessions', {
              ipsids: ['ipsid-2']
            }, function(){});
          });
        });
      });
      can('被删除的会话信息不会被查询到', function(done){
        wangyu.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: 'ipid-1',
          skip: 0,
          limit: 10
        }, function(data){
          var interestingPointSessionsCountBeforeRemove;
          interestingPointSessionsCountBeforeRemove = data.interestingPointSessions.length;
          baixin.interestingPointsChannel.emit('remove-interesting-point-sessions', {
            ipsids: ['ipsid-2']
          }, function(data){
            wangyu.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
              ipid: 'ipid-1',
              skip: 0,
              limit: 10
            }, function(data){
              data.interestingPointSessions.length.should.below(interestingPointSessionsCountBeforeRemove);
              done();
            });
          });
        });
      });
      can('对应的兴趣点的会话数会减少', function(done){
        baixin.locationsChannel.emit('retrieve-interesting-points', {
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
          baixin.interestingPointsChannel.emit('remove-interesting-point-sessions', {
            ipsids: ['ipsid-2']
          }, function(data){
            baixin.locationsChannel.emit('retrieve-interesting-points', {
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
              interestingPointBeforeOperate.interestingPointSessionsCount.should.eql(interestingPointAfterOperate.interestingPointSessionsCount + 1);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
