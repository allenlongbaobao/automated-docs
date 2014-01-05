(function(){
  var FIXTURE_PATH, requestCreateANewInterestingPointSession;
  FIXTURE_PATH = 'integrated/create-a-new-interesting-point-session/fixture/';
  requestCreateANewInterestingPointSession = utils.loadFixture(FIXTURE_PATH + 'request-create-a-new-interesting-point-session');
  describe('integrated test -- create-a-new-interesting-point-session', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/create-a-new-interesting-point-session', ['users', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('兴趣点会话创建过程中', function(){
      can('请求的报文出错，能够给回出错提示', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['http://www.some.com']
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-interesting-point-session', {}, function(data){
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
          loggedIn: false,
          urls: ['http://www.some.com']
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.should.includeEql({
              message: '事件create-a-new-interesting-point-session需要登录才能完成'
            });
            done();
          });
        });
      });
      can('兴趣点不存在时，能够给回出错信息', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['http://www.some.com']
        }, function(client, responseData){
          client.interestingPointsChannel.emit('create-a-new-interesting-point-session', (requestCreateANewInterestingPointSession.ipid = 'inexistence-ipid', requestCreateANewInterestingPointSession), function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('若兴趣点是私有兴趣点时，只有创建者、被@的用户、被分享的用户能够创建会话', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(client1){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(client2){
            socketHelper.getClient({
              uid: 'uid-3',
              loggedIn: true
            }, function(client3){
              socketHelper.getClient({
                uid: 'uid-4',
                loggedIn: true
              }, function(client4){
                client1.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
                  ipid: 'ipid-2',
                  title: 'test'
                }, function(data){
                  data.should.have.property('result', 'success');
                  data.should.have.property('errors')['with'].length(0);
                  client2.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
                    ipid: 'ipid-2',
                    title: 'test'
                  }, function(data){
                    data.should.have.property('result', 'success');
                    data.should.have.property('errors')['with'].length(0);
                    client3.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
                      ipid: 'ipid-2',
                      title: 'test'
                    }, function(data){
                      data.should.have.property('result', 'success');
                      data.should.have.property('errors')['with'].length(0);
                      client4.interestingPointsChannel.emit('create-a-new-interesting-point-session', {
                        ipid: 'ipid-2',
                        title: 'test'
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
        });
      });
    });
    describe('成功创建兴趣点会话后', function(){
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
        urls: ['http://www.baidu.com']
      };
      xiaodong = baixin = wangyu = weike = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannel){
          socketHelper.getClient(baixinInfo, function(baixinChannel, responseData){
            socketHelper.getClient(wangyuInfo, function(wangyuChannel){
              socketHelper.getClient(weikeInfo, function(weikeChannel){
                var baixinCurrentLocation;
                xiaodong = xiaodongChannel;
                baixin = baixinChannel;
                wangyu = wangyuChannel;
                weike = weikeChannel;
                baixinCurrentLocation = responseData.locationsChannel.locations[0];
                baixin.locationsChannel.emit('retrieve-interesting-points', {
                  lid: baixinCurrentLocation._id,
                  offset: 0,
                  count: 10
                }, function(result){
                  requestCreateANewInterestingPointSession.ipid = result.interestingPoints[0]._id;
                  done();
                });
              });
            });
          });
        });
      });
      can('创建者能够获得创建后的兴趣点会话数据', function(done){
        baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('createdInterestingPointSession');
          data.result.should.eql('success');
          data.createdInterestingPointSession.should.have.property('url');
          data.createdInterestingPointSession.should.have.property('sessionIndex');
          data.errors.length.should.eql(0);
          data.createdInterestingPointSession.title.should.eql(requestCreateANewInterestingPointSession.title);
          data.createdInterestingPointSession.ipid.should.eql(requestCreateANewInterestingPointSession.ipid);
          done();
        });
      });
      can('创建者能够出现在兴趣点的参与用户列表中', function(done){
        baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
          baixin.locationsChannel.emit('retrieve-interesting-points', {
            lid: 'lid-1',
            offset: 0,
            count: 10
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('interestingPoints');
            data.interestingPoints[0].should.have.property('participant');
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.interestingPoints[0].participant).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.include(baixinInfo.uid);
            done();
          });
        });
      });
      can('关注了兴趣点的用户能够收到更新消息推送', function(done){
        var createdInterestingPointSession;
        createdInterestingPointSession = null;
        weike.interestingPointsChannel.on('push-session-updated-in-watching-interesting-point', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedInterestingPointSession');
            data.type.should.eql('added');
            data.addedInterestingPointSession.should.eql(createdInterestingPointSession);
            done();
          }, 100);
        });
        weike.interestingPointsChannel.emit('watch-interesting-points', {
          ipids: [requestCreateANewInterestingPointSession.ipid]
        }, function(data){
          baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
            createdInterestingPointSession = data.createdInterestingPointSession;
          });
        });
      });
      can('兴趣点的创建者能够收到更新消息推送', function(done){
        var createdInterestingPointSession;
        createdInterestingPointSession = null;
        xiaodong.interestingPointsChannel.on('push-session-updated-in-created-interesting-point', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedInterestingPointSession');
            data.type.should.eql('added');
            data.addedInterestingPointSession.should.eql(createdInterestingPointSession);
            done();
          }, 100);
        });
        baixin.interestingPointsChannel.on('push-session-updated-in-created-interesting-point', function(data){
          data.should.fail('会话创建者收到了消息推送');
        });
        weike.interestingPointsChannel.on('push-session-updated-in-created-interesting-point', function(data){
          data.should.fail('不相关用户接收到消息推送');
        });
        baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
          createdInterestingPointSession = data.createdInterestingPointSession;
        });
      });
      can('打开了该兴趣点的用户能够收到更新消息推送', function(done){
        var createdInterestingPointSession;
        createdInterestingPointSession = null;
        wangyu.interestingPointsChannel.on('push-session-updated-in-opening-interesting-point', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.should.have.property('addedInterestingPointSession');
            data.type.should.eql('added');
            data.addedInterestingPointSession.should.eql(createdInterestingPointSession);
            done();
          }, 100);
        });
        wangyu.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
          ipid: requestCreateANewInterestingPointSession.ipid
        }, function(data){
          wangyu.interestingPointsChannel.emit('open-interesting-point-and-session', {
            ipid: requestCreateANewInterestingPointSession.ipid,
            ipsid: data.interestingPointSessions[0]._id
          }, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('success');
            data.errors.length.should.eql(0);
            baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
              createdInterestingPointSession = data.createdInterestingPointSession;
            });
          });
        });
      });
      can('对应的兴趣点的会话数量会增加', function(done){
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
              if (x$._id === requestCreateANewInterestingPointSession.ipid) {
                results$.push(x$);
              }
            }
            return results$;
          }())[0];
          baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
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
                  if (x$._id === requestCreateANewInterestingPointSession.ipid) {
                    results$.push(x$);
                  }
                }
                return results$;
              }())[0];
              interestingPointBeforeOperate.interestingPointSessionsCount.should.eql(interestingPointAfterOperate.interestingPointSessionsCount - 1);
              done();
            });
          });
        });
      });
      can('在location的参与用户中能够被查询到创建者', function(done){
        baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
          xiaodong.locationsChannel.emit('retrieve-attended-users', {
            lid: 'lid-1'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('users');
            (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.users).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                results$.push(x$._id);
              }
              return results$;
            }()).should.includeEql(baixinInfo.uid);
            done();
          });
        });
      });
      can('在同一个location的用户能够收到创建者的推送信息', function(done){
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
            data.user.should.have.property('_id', baixinInfo.uid);
            data.user.should.have.property('status', 'online');
            waiter1();
          });
          baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
            data.should.have.property('result', 'success');
            waiter2();
          });
        });
      });
    });
  });
}).call(this);
