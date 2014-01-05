(function(){
  var FIXTURE_PATH, requestCreateANewComment;
  FIXTURE_PATH = 'integrated/create-a-new-comment/fixture/';
  requestCreateANewComment = utils.loadFixture(FIXTURE_PATH + 'request-create-a-new-comment');
  describe('integrated test -- create-a-new-comment', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/create-a-new-comment', ['users', 'interesting-points', 'interesting-point-sessions', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('评论创建过程中', function(){
      can('请求的报文出错时，能够给出错误信息', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: []
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-comment', {}, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('用户未登录时，能够给回未登录提示', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.should.includeEql({
              message: '事件create-a-new-comment需要登录才能完成'
            });
            done();
          });
        });
      });
      can('会话不存在时，能够返回出错信息', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-comment', (requestCreateANewComment.ipsid = 'inexistence-session-id', requestCreateANewComment), function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
    });
    describe('成功创建评论后', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo, xiaodong, baixin, wangyu, weike;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      xiaodong = baixin = wangyu = weike = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannel){
          socketHelper.getClient(baixinInfo, function(baixinChannel){
            socketHelper.getClient(wangyuInfo, function(wangyuChannel){
              socketHelper.getClient(weikeInfo, function(weikeChannel, responseData){
                xiaodong = xiaodongChannel;
                baixin = baixinChannel;
                wangyu = wangyuChannel;
                weike = weikeChannel;
                requestCreateANewComment.ipid = 'ipid-1';
                requestCreateANewComment.ipsid = 'ipsid-2';
                requestCreateANewComment.isAnonymous = false;
                done();
              });
            });
          });
        });
      });
      can('创建者能够获得创建后的评论数据', function(done){
        weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('createdComment');
          data.result.should.eql('success');
          data.createdComment.should.have.property('url');
          data.createdComment.should.have.property('sessionIndex');
          data.createdComment.should.have.property('commentIndex');
          data.errors.length.should.eql(0);
          done();
        });
      });
      can('创建者信息会出现在兴趣点的参与用户中', function(done){
        weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          weike.locationsChannel.emit('retrieve-interesting-points', {
            lid: 'lid-1',
            offset: 0,
            count: 10
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('interestingPoints')['with'].length(1);
            data.interestingPoints[0].should.have.property('participant');
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.interestingPoints[0].participant).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.include(weikeInfo.uid);
            done();
          });
        });
      });
      can('若是匿名评论，创建者信息会被隐藏，并且不会出现在兴趣点的参与用户中', function(done){
        weike.interestingPointsChannel.emit('create-a-new-comment', (requestCreateANewComment.isAnonymous = true, requestCreateANewComment), function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('createdComment');
          data.result.should.eql('success');
          data.errors.length.should.eql(0);
          data.createdComment.should.have.property('sendBy');
          data.createdComment.sendBy.should.have.property('_id');
          data.createdComment.sendBy._id.should.not.eql(weikeInfo.uid);
          weike.locationsChannel.emit('retrieve-interesting-points', {
            lid: 'lid-1',
            offset: 0,
            count: 10
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('interestingPoints')['with'].length(1);
            data.interestingPoints[0].should.have.property('participant');
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.interestingPoints[0].participant).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.not.include(weikeInfo.uid);
            done();
          });
        });
      });
      can('正在浏览该兴趣点会话的用户能够收到通知', function(done){
        var createdComment;
        createdComment = null;
        wangyu.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedComment');
            data.type.should.eql('added');
            data.addedComment.should.eql(createdComment);
            done();
          }, 100);
        });
        wangyu.interestingPointsChannel.emit('open-interesting-point-and-session', {
          ipid: requestCreateANewComment.ipid,
          ipsid: requestCreateANewComment.ipsid
        }, function(data){
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
            createdComment = data.createdComment;
          });
        });
      });
      can('被评论的兴趣点会话创建者能够收到消息通知', function(done){
        var createdComment;
        createdComment = null;
        baixin.interestingPointsChannel.on('push-comment-updated-in-created-session', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedComment');
            data.type.should.eql('added');
            data.addedComment.should.eql(createdComment);
            done();
          }, 100);
        });
        weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          createdComment = data.createdComment;
        });
      });
      can('关注该兴趣点会话的用户能够收到消息通知', function(done){
        var createdComment;
        createdComment = null;
        xiaodong.interestingPointsChannel.on('push-comment-updated-in-watching-session', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedComment');
            data.type.should.eql('added');
            data.addedComment.should.eql(createdComment);
            done();
          }, 100);
        });
        xiaodong.interestingPointsChannel.emit('watch-interesting-point-sessions', {
          ipsids: [requestCreateANewComment.ipsid]
        }, function(data){
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
            createdComment = data.createdComment;
          });
        });
      });
      can('被@到的用户能够收到消息通知', function(done){
        var createdComment;
        createdComment = null;
        xiaodong.interestingPointsChannel.on('push-new-mention-in-comment', function(data){
          setTimeout(function(){
            data.should.eql(createdComment);
            done();
          }, 100);
        });
        wangyu.interestingPointsChannel.on('push-new-mention-in-comment', function(data){
          data.should.fail('没被@到的用户收到了被@消息');
        });
        baixin.interestingPointsChannel.on('push-new-mention-in-comment', function(data){
          data.should.fail('没被@到的用户收到了被@消息');
        });
        weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          createdComment = data.createdComment;
        });
      });
      can('用户能够查询到新创建的评论', function(done){
        weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          var createdComment;
          createdComment = data.createdComment;
          wangyu.interestingPointsChannel.emit('retrieve-comments', {
            ipsid: requestCreateANewComment.ipsid,
            skip: 0,
            limit: 10
          }, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.should.have.property('comments');
            data.comments.should.includeEql(_.omit(createdComment, 'url', 'sessionIndex', 'commentIndex'));
            done();
          });
        });
      });
      can('除非匿名，否则创建者能够在location的参与用户中被查询到', function(done){
        requestCreateANewComment.isAnonymous = Math.random() > 0.5 ? true : false;
        weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
          var createdComment;
          data.should.have.property('result', 'success');
          createdComment = data.createdComment;
          xiaodong.locationsChannel.emit('retrieve-attended-users', {
            lid: 'lid-1'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('users');
            if (requestCreateANewComment.isAnonymous === true) {
              (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  results$.push(x$._id);
                }
                return results$;
              }()).should.not.includeEql(weikeInfo.uid);
            } else {
              (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  results$.push(x$._id);
                }
                return results$;
              }()).should.includeEql(weikeInfo.uid);
            }
            done();
          });
        });
      });
      can('对应的会话的评论数量会增加', function(done){
        weike.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: requestCreateANewComment.ipid,
          skip: 0,
          limit: 10
        }, function(data){
          var interestingPointSessionBeforeOperate;
          interestingPointSessionBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.interestingPointSessions).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === requestCreateANewComment.ipsid) {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
            weike.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
              ipid: requestCreateANewComment.ipid,
              skip: 0,
              limit: 10
            }, function(data){
              var interestingPointSessionAfterOperate;
              interestingPointSessionAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.interestingPointSessions).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === requestCreateANewComment.ipsid) {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              interestingPointSessionBeforeOperate.commentsCount.should.eql(interestingPointSessionAfterOperate.commentsCount - 1);
              done();
            });
          });
        });
      });
      can('在不是匿名的情况下，在同一个location的用户在参与列表可以收到创建者的信息推送', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.locationsChannel.emit('open-web-page', {
          url: 'http://www.some.com'
        }, function(data){
          data.should.have.property('result', 'success');
          xiaodong.locationsChannel.on('push-attended-user-updated', function(data){
            data.should.have.property('location');
            data.should.have.property('user');
            data.location.should.have.property('id', 'lid-1');
            data.user.should.have.property('_id', weikeInfo.uid);
            data.user.should.have.property('status', 'online');
            waiter1();
          });
          weike.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
            data.should.have.property('result', 'success');
            waiter2();
          });
        });
      });
    });
  });
}).call(this);
