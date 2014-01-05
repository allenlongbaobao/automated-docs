(function(){
  var FIXTURE_PATH, requestCreateANewReply;
  FIXTURE_PATH = 'integrated/create-a-new-reply/fixture/';
  requestCreateANewReply = utils.loadFixture(FIXTURE_PATH + 'request-create-a-new-reply');
  describe('integrated test -- create-a-new-reply', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/create-a-new-reply', ['users', 'interesting-points', 'interesting-point-sessions', 'messages', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('创建回复过程中', function(){
      can('请求的报文出错，能够给回出错信息', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['http://www.some.com']
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-reply', {}, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('用户未登录时，能够给回未登录消息', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.should.includeEql({
              message: '事件create-a-new-reply需要登录才能完成'
            });
            done();
          });
        });
      });
      can('回复的评论不存在时，能够给回出错提示', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(client){
          client.interestingPointsChannel.emit('create-a-new-reply', (requestCreateANewReply.rMid = 'inexistence-comment-id', requestCreateANewReply), function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
    });
    describe('成功创建回复后', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo, jiahuaInfo, xiaodong, baixin, wangyu, weike, jiahua;
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
      jiahuaInfo = {
        uid: 'uid-5',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      xiaodong = baixin = wangyu = weike = jiahua = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannel){
          socketHelper.getClient(baixinInfo, function(baixinChannel){
            socketHelper.getClient(wangyuInfo, function(wangyuChannel, responseData){
              socketHelper.getClient(weikeInfo, function(weikeChannel){
                socketHelper.getClient(jiahuaInfo, function(jiahuaChannel){
                  xiaodong = xiaodongChannel;
                  baixin = baixinChannel;
                  wangyu = wangyuChannel;
                  weike = weikeChannel;
                  jiahua = jiahuaChannel;
                  requestCreateANewReply.ipid = 'ipid-1';
                  requestCreateANewReply.ipsid = 'ipsid-2';
                  requestCreateANewReply.rMid = 'mid-1';
                  requestCreateANewReply.textContent = "@baixin 好吧";
                  requestCreateANewReply.isAnonymous = false;
                  done();
                });
              });
            });
          });
        });
      });
      can('创建者能够收到创建后的回复数据', function(done){
        wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('createdReply');
          data.result.should.eql('success');
          data.createdReply.should.have.property('url');
          data.createdReply.should.have.property('sessionIndex');
          data.createdReply.should.have.property('commentIndex');
          data.createdReply.should.have.property('replyIndex');
          data.errors.length.should.eql(0);
          done();
        });
      });
      can('创建能出现在兴趣点的参与用户列表中', function(done){
        wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
          wangyu.locationsChannel.emit('retrieve-interesting-points', {
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
            }()).should.include(wangyuInfo.uid);
            done();
          });
        });
      });
      can('匿名回复时，创建者的信息能够被隐藏，并且不会出现在兴趣点的参与用户中', function(done){
        requestCreateANewReply.isAnonymous = true;
        wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('createdReply');
          data.result.should.eql('success');
          data.errors.length.should.eql(0);
          data.createdReply.should.have.property('sendBy');
          data.createdReply.should.have.property('_id');
          data.createdReply.sendBy._id.should.not.eql(wangyu.uid);
          wangyu.locationsChannel.emit('retrieve-interesting-points', {
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
            }()).should.not.include(wangyuInfo.uid);
            done();
          });
        });
      });
      can('正在浏览回复所在评论的用户能够接收到消息通知', function(done){
        var createdReply;
        createdReply = null;
        jiahua.interestingPointsChannel.on('push-reply-updated-in-opening-comment', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedReply');
            data.type.should.eql('added');
            data.addedReply.should.eql(createdReply);
            done();
          }, 100);
        });
        jiahua.interestingPointsChannel.emit('open-comment', {
          cid: requestCreateANewReply.rMid
        }, function(data){
          wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
            createdReply = data.createdReply;
          });
        });
      });
      can('回复所在的评论创建者能够接收到消息通知', function(done){
        var createdReply;
        createdReply = null;
        weike.interestingPointsChannel.on('push-reply-updated-in-created-comment', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedReply');
            data.type.should.eql('added');
            data.addedReply.should.eql(createdReply);
            done();
          }, 100);
        });
        wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
          createdReply = data.createdReply;
        });
      });
      can('被@到的用户能够接收到消息提示', function(done){
        var createdReply;
        createdReply = null;
        baixin.interestingPointsChannel.on('push-new-mention-in-reply', function(data){
          setTimeout(function(){
            data.should.eql(createdReply);
            done();
          }, 100);
        });
        wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
          createdReply = data.createdReply;
        });
      });
      can('创建的回复能够被其他用户查询到', function(done){
        wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
          var createdReply;
          createdReply = data.createdReply;
          jiahua.interestingPointsChannel.emit('retrieve-replies', {
            cid: requestCreateANewReply.rMid,
            skip: 0,
            limit: 10
          }, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.should.have.property('replies');
            data.result.should.eql('success');
            data.errors.length.should.eql(0);
            data.replies.should.includeEql(_.omit(createdReply, 'url', 'replyIndex', 'commentIndex', 'sessionIndex'));
            done();
          });
        });
      });
      can('除非匿名，否则能够在location的参与用户中查询到创建者', function(done){
        var isAnonymous;
        isAnonymous = Math.random() > 0.5 ? true : false;
        wangyu.interestingPointsChannel.emit('create-a-new-reply', import$({
          isAnonymous: isAnonymous
        }, requestCreateANewReply), function(data){
          var createdReply;
          createdReply = data.createdReply;
          xiaodong.locationsChannel.emit('retrieve-attended-users', {
            lid: 'lid-1'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('users');
            if (requestCreateANewReply.isAnonymous) {
              (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  results$.push(x$._id);
                }
                return results$;
              }()).should.not.includeEql(wangyuInfo.uid);
            } else {
              (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  results$.push(x$._id);
                }
                return results$;
              }()).should.includeEql(wangyuInfo.uid);
            }
            done();
          });
        });
      });
      can('对应的评论的回复数量会增加', function(done){
        jiahua.interestingPointsChannel.emit('retrieve-comments', {
          ipsid: requestCreateANewReply.ipsid,
          skip: 0,
          limit: 10
        }, function(data){
          var commentBeforeOperate;
          commentBeforeOperate = (function(){
            var i$, x$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = data.comments).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              if (x$._id === requestCreateANewReply.rMid) {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
            jiahua.interestingPointsChannel.emit('retrieve-comments', {
              ipsid: requestCreateANewReply.ipsid,
              skip: 0,
              limit: 10
            }, function(data){
              var commentAfterOperate;
              commentAfterOperate = (function(){
                var i$, x$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = data.comments).length; i$ < len$; ++i$) {
                  x$ = ref$[i$];
                  if (x$._id === requestCreateANewReply.rMid) {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              commentBeforeOperate.repliesCount.should.eql(commentAfterOperate.repliesCount - 1);
              done();
            });
          });
        });
      });
      can('在不匿名的情况下，在同一个location的用户能够收到创建者的推送信息', function(done){
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
            data.user.should.have.property('_id', wangyuInfo.uid);
            data.user.should.have.property('status', 'online');
            waiter1();
          });
          wangyu.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
            data.should.have.property('result', 'success');
            waiter2();
          });
        });
      });
    });
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
