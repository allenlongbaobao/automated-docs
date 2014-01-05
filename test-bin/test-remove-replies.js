(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/remove-replies/fixture/';
  describe('integrated test -- remove-replies', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/remove-replies', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
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
        channels.interestingPointsChannel.emit('remove-replies', {}, function(data){
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
        channels.interestingPointsChannel.emit('remove-replies', {
          rids: ['mid-1']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件remove-replies需要登录才能完成'
          });
          done();
        });
      });
    });
    can('请求删除的回复不存在时，能够给回错误提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('remove-replies', {
          rids: ['inexistence-reply-id']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('操作者不是回复的创建者时，能够给回出错提示', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(xiaodong){
        socketHelper.getClient({
          uid: 'uid-2',
          loggedIn: true
        }, function(baixin){
          socketHelper.getClient({
            uid: 'uid-3',
            loggedIn: true
          }, function(wangyu){
            var requestCreateANewComment, requestCreateANewReply;
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
            baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
              wangyu.interestingPointsChannel.emit('create-a-new-reply', (requestCreateANewReply.rMid = data.createdComment._id, requestCreateANewReply), function(data){
                xiaodong.interestingPointsChannel.emit('remove-replies', {
                  rids: [data.createdReply._id]
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
      });
    });
    describe('成功删除后', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo, jiahuaInfo, xiaodong, baixin, wangyu, weike, jiahua, requestCreateANewComment, requestCreateANewReply, replyId, commentId;
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
      jiahuaInfo = {
        uid: 'uid-4',
        loggedIn: true
      };
      xiaodong = baixin = wangyu = weike = jiahua = null;
      requestCreateANewComment = {
        ipid: 'ipid-2',
        ipsid: 'ipsid-2',
        type: 'ips-msg',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      requestCreateANewReply = {
        ipid: 'ipid-2',
        ipsid: 'ipsid-2',
        type: 'ip-rpl',
        originalContentType: 'text',
        textContent: 'xxx',
        voiceContent: 'xxx',
        isAnonymous: false
      };
      replyId = commentId = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannel){
          socketHelper.getClient(baixinInfo, function(baixinChannel){
            socketHelper.getClient(wangyuInfo, function(wangyuChannel){
              socketHelper.getClient(weikeInfo, function(weikeChannel){
                socketHelper.getClient(jiahuaInfo, function(jiahuaChannel){
                  xiaodong = xiaodongChannel;
                  baixin = baixinChannel;
                  wangyu = wangyuChannel;
                  weike = weikeChannel;
                  jiahua = jiahuaChannel;
                  baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
                    jiahua.interestingPointsChannel.emit('create-a-new-reply', (requestCreateANewReply.rMid = data.createdComment._id, requestCreateANewReply), function(data){
                      replyId = data.createdReply._id;
                      commentId = data.createdReply.rMid;
                      if (data.result === 'success') {
                        done();
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
      can('能够收到删除成功的返回信息', function(done){
        jiahua.interestingPointsChannel.emit('remove-replies', {
          rids: [replyId]
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
      can('评论的创建者、浏览者能够收到消息推送', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.interestingPointsChannel.on('push-reply-updated-in-created-comment', function(data){
          waiter1();
        });
        weike.interestingPointsChannel.on('push-reply-updated-in-opening-comment', function(data){
          waiter2();
        });
        weike.interestingPointsChannel.emit('open-comment', {
          cid: commentId
        }, function(){
          jiahua.interestingPointsChannel.emit('remove-replies', {
            rids: [replyId]
          }, function(){});
        });
      });
      can('被删除的回复不会被查询到', function(done){
        jiahua.interestingPointsChannel.emit('retrieve-replies', {
          cid: commentId,
          skip: 0,
          limit: 10
        }, function(data){
          data.should.have.property('replies')['with'].length(1);
          jiahua.interestingPointsChannel.emit('remove-replies', {
            rids: [replyId]
          }, function(data){
            jiahua.interestingPointsChannel.emit('retrieve-replies', {
              cid: commentId,
              skip: 0,
              limit: 10
            }, function(data){
              data.should.have.property('replies')['with'].length(0);
              done();
            });
          });
        });
      });
      can('对应的评论的回复数量会减少', function(done){
        jiahua.interestingPointsChannel.emit('retrieve-comments', {
          ipsid: 'ipsid-2',
          skip: 0,
          limit: 10
        }, function(data){
          var commentBeforeOperate;
          commentBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.comments).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === commentId) {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          jiahua.interestingPointsChannel.emit('remove-replies', {
            rids: [replyId]
          }, function(data){
            jiahua.interestingPointsChannel.emit('retrieve-comments', {
              ipsid: 'ipsid-2',
              skip: 0,
              limit: 10
            }, function(data){
              var commentAfterOperate;
              commentAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.comments).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === commentId) {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              commentBeforeOperate.repliesCount.should.eql(commentAfterOperate.repliesCount + 1);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
