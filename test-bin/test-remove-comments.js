(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/remove-comments/fixture/';
  describe('integrated test -- remove-comments', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/remove-comments', ['users', 'locations', 'interesting-point-sessions', 'interesting-points'], done);
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
        channels.interestingPointsChannel.emit('remove-comments', {}, function(data){
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
        channels.interestingPointsChannel.emit('remove-comments', {
          cids: ['mid-1', 'mid-2']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件remove-comments需要登录才能完成'
          });
          done();
        });
      });
    });
    can('请求删除的评论不存在时，能够给回错误提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('remove-comments', {
          cids: ['inexistence-comment-id', 'mid-1']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('操作者没有权限删除', function(){
      var baixinInfo, wangyuInfo, baixin, wangyu, requestCreateANewComment, requestCreateANewReply;
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true
      };
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true
      };
      baixin = wangyu = null;
      requestCreateANewComment = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      requestCreateANewReply = {
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        type: 'ip-rpl',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      beforeEach(function(done){
        socketHelper.getClient(baixinInfo, function(baixinChannel){
          socketHelper.getClient(wangyuInfo, function(wangyuChannel){
            baixin = baixinChannel;
            wangyu = wangyuChannel;
            done();
          });
        });
      });
      can('不是评论创建者时，能够给回错误信息', function(done){
        baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          wangyu.interestingPointsChannel.emit('remove-comments', {
            cids: [data.createdComment._id]
          }, function(data){
            data.should.have.property('result', 'failed');
            data.should.have.property('errors');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('评论已被人回复时，能够给回错误信息', function(done){
        baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          wangyu.interestingPointsChannel.emit('create-a-new-reply', (requestCreateANewReply.rMid = data.createdComment._id, requestCreateANewReply), function(data){
            baixin.interestingPointsChannel.emit('remove-comments', {
              cids: [data.createdReply.rMid]
            }, function(data){
              data.should.have.property('result', 'failed');
              data.should.have.property('errors');
              data.errors.length.should.above(0);
              done();
            });
          });
        });
      });
    });
    describe('成功删除后', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo, xiaodong, baixin, wangyu, weike, requestCreateANewComment, commentId;
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
      requestCreateANewComment = {
        ipid: 'ipid-2',
        ipsid: 'ipsid-2',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      commentId = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannel){
          socketHelper.getClient(baixinInfo, function(baixinChannel){
            socketHelper.getClient(wangyuInfo, function(wangyuChannel){
              socketHelper.getClient(weikeInfo, function(weikeChannel){
                xiaodong = xiaodongChannel;
                baixin = baixinChannel;
                wangyu = wangyuChannel;
                weike = weikeChannel;
                weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
                  commentId = data.createdComment._id;
                  if (data.result === 'success') {
                    done();
                  }
                });
              });
            });
          });
        });
      });
      can('能够返回操作成功信息', function(done){
        weike.interestingPointsChannel.emit('remove-comments', {
          cids: [commentId]
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('评论所在的会话创建者、订阅者、浏览者能够收到消息推送', function(done){
        var waiter, waiter1, waiter2, waiter3;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        xiaodong.interestingPointsChannel.on('push-comment-updated-in-created-session', function(data){
          data.should.have.property('type', 'removed');
          data.should.have.property('removedComment');
          waiter1();
        });
        baixin.interestingPointsChannel.on('push-comment-updated-in-watching-session', function(data){
          data.should.have.property('type', 'removed');
          data.should.have.property('removedComment');
          waiter2();
        });
        wangyu.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
          data.should.have.property('type', 'removed');
          data.should.have.property('removedComment');
          waiter3();
        });
        baixin.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: ['ipsid-2']
        }, function(data){
          data.should.have.property('result', 'success');
          wangyu.interestingPointsChannel.emit('open-interesting-point-and-session', {
            ipid: 'ipid-2',
            ipsid: 'ipsid-2'
          }, function(data){
            data.should.have.property('result', 'success');
            weike.interestingPointsChannel.emit('remove-comments', {
              cids: [commentId]
            }, function(data){
              data.should.have.property('result', 'success');
            });
          });
        });
      });
      can('被删除的评论信息不会被查询到', function(done){
        weike.interestingPointsChannel.emit('remove-comments', {
          cids: [commentId]
        }, function(data){
          weike.interestingPointsChannel.emit('retrieve-comments', {
            ipsid: 'ipsid-2',
            skip: 0,
            limit: 10
          }, function(data){
            data.comments.length.should.eql(0);
            done();
          });
        });
      });
      can('对应的会话的评论数会减少', function(done){
        weike.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: 'ipid-2',
          skip: 0,
          limit: 10
        }, function(data){
          var interestingPointSessionBeforeOperate;
          interestingPointSessionBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.interestingPointSessions).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === 'ipsid-2') {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          weike.interestingPointsChannel.emit('remove-comments', {
            cids: [commentId]
          }, function(data){
            weike.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
              ipid: 'ipid-2',
              skip: 0,
              limit: 10
            }, function(data){
              var interestingPointSessionAfterOperate;
              interestingPointSessionAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.interestingPointSessions).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === 'ipsid-2') {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              interestingPointSessionBeforeOperate.commentsCount.should.eql(interestingPointSessionAfterOperate.commentsCount + 1);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
