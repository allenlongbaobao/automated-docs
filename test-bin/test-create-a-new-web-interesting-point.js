(function(){
  var FIXTURE_PATH, requestCreateANewWebInterestingPoint;
  FIXTURE_PATH = 'integrated/create-a-new-web-interesting-point/fixture/';
  requestCreateANewWebInterestingPoint = utils.loadFixture(FIXTURE_PATH + 'request-create-a-new-web-interesting-point');
  describe('integrated test -- create-a-new-web-interesting-point', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/create-a-new-web-interesting-point', ['users', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('创建过程中', function(){
      can('若提交的报文出错，能够给回出错信息', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('create-a-new-web-interesting-point', {}, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('若未登录发送请求，能够给回未登录提示', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(channels){
          channels.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.should.includeEql({
              message: '事件create-a-new-web-interesting-point需要登录才能完成'
            });
            done();
          });
        });
      });
      can('若对应的location不存在，能够给回出错信息', function(done){
        requestCreateANewWebInterestingPoint.withinLocation.lid = 'unexistence-location-id';
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(channels){
          channels.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
    });
    describe('成功创建兴趣点后', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo, xiaodong, baixin, wangyu, weike;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true,
        urls: ['http://www.baidu.com']
      };
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      weikeInfo = {
        uid: 'uid-4',
        loggedIn: true,
        urls: ['http://baidu.com']
      };
      xiaodong = baixin = wangyu = weike = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannels, datas){
          socketHelper.getClient(baixinInfo, function(baixinChannels){
            socketHelper.getClient(wangyuInfo, function(wangyuChannels){
              socketHelper.getClient(weikeInfo, function(weikeChannels){
                var locationsChannelInitialResponseData, xiaodongCurrentLocation;
                xiaodong = xiaodongChannels;
                baixin = baixinChannels;
                wangyu = wangyuChannels;
                weike = weikeChannels;
                locationsChannelInitialResponseData = datas.locationsChannel;
                xiaodongCurrentLocation = locationsChannelInitialResponseData.locations[0];
                requestCreateANewWebInterestingPoint.withinLocation.lid = xiaodongCurrentLocation._id;
                requestCreateANewWebInterestingPoint.withinLocation.url = xiaodongCurrentLocation.urls[0];
                requestCreateANewWebInterestingPoint.isPrivate = false;
                requestCreateANewWebInterestingPoint.content = '@weike 好吧。。';
                requestCreateANewWebInterestingPoint.sharedWith = [baixinInfo.uid];
                done();
              });
            });
          });
        });
      });
      can('创建者能够获得返回的兴趣点数据，收不到推送消息', function(done){
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('createdInterestingPoint');
          data.result.should.eql('success');
          data.errors.length.should.eql(0);
          done();
        });
      });
      can('兴趣点所在的location信息得到更新', function(done){
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          socketHelper.getClient({
            loggedIn: false,
            urls: [requestCreateANewWebInterestingPoint.withinLocation.url]
          }, function(channels, responseData){
            responseData.locationsChannel.locations[0].interestingPointsCount.should.eql(1);
            done();
          });
        });
      });
      can('若是公有兴趣点，同一个页面的在线用户能够收到兴趣点的推送消息', function(done){
        wangyu.locationsChannel.on('push-interesting-point-updated', function(data){
          setTimeout(function(){
            data.should.have.property('type');
            data.type.should.eql('added');
            data.should.have.property('addedInterestingPoint');
            done();
          }, 100);
        });
        baixin.locationsChannel.on('push-interesting-point-updated', function(data){
          data.should.fail('不同页面的用户收到当前页面的兴趣点推送');
        });
        weike.locationsChannel.on('push-interesting-point-updated', function(data){
          data.should.fail('不同页面的用户收到当前页面的兴趣点推送');
        });
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){});
      });
      can('若创建过程中@到其他用户，被@到的用户能够收到消息', function(done){
        var createdInterestingPoint;
        createdInterestingPoint = null;
        weike.interestingPointsChannel.on('push-new-mention-in-interesting-point', function(data){
          setTimeout(function(){
            data.should.eql(createdInterestingPoint);
            done();
          }, 100);
        });
        baixin.interestingPointsChannel.on('push-new-mention-in-interesting-point', function(data){
          data.should.failed('没有被@到的用户收到了@消息');
        });
        wangyu.interestingPointsChannel.on('push-new-mention-in-interesting-point', function(data){
          data.should.failed('没有被@到的用户收到了@消息');
        });
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          createdInterestingPoint = data.createdInterestingPoint;
        });
      });
      can('若是公有兴趣点，能够被用户查询到', function(done){
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          wangyu.locationsChannel.emit('retrieve-interesting-points', {
            lid: data.createdInterestingPoint.withinLocation.lid,
            offset: 0,
            count: 10
          }, function(retrieveResult){
            retrieveResult.should.have.property('result');
            retrieveResult.should.have.property('errors');
            retrieveResult.should.have.property('interestingPointsCount');
            retrieveResult.should.have.property('interestingPoints');
            retrieveResult.interestingPoints[0]._id.should.eql(data.createdInterestingPoint._id);
            wangyu.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
              ipid: data.createdInterestingPoint._id,
              limit: 10,
              skip: 0
            }, function(retrieveResult){
              retrieveResult.should.have.property('result', 'success');
              retrieveResult.interestingPointSessions.length.should.above(0);
              done();
            });
          });
        });
      });
      can('若是公有兴趣点，在location的参与用户中查询到创建者', function(done){
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          var createdInterestingPoint;
          data.should.have.property('result', 'success');
          createdInterestingPoint = data.createdInterestingPoint;
          wangyu.locationsChannel.emit('retrieve-attended-users', {
            lid: createdInterestingPoint.withinLocation.lid
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
            }()).should.includeEql(xiaodongInfo.uid);
            done();
          });
        });
      });
      can('若是公有兴趣点，同一个location的用户能收到创建者的信息推送', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.locationsChannel.emit('open-web-page', {
          url: 'http://www.some.com'
        }, function(data){
          data.should.have.property('result', 'success');
          baixin.locationsChannel.on('push-attended-user-updated', function(data){
            data.should.have.property('location');
            data.should.have.property('user');
            data.location.should.have.property('id', 'lid-1');
            data.user.should.have.property('_id', xiaodongInfo.uid);
            data.user.should.have.property('status', 'online');
            waiter1();
          });
          xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
            data.should.have.property('result', 'success');
            waiter2();
          });
        });
      });
      can('若是私有兴趣点，只有被分享和被@的用户能够收到消息推送，而其他用户不能收到', function(done){
        var createdInterestingPoint, waiter, waiter1, waiter2;
        requestCreateANewWebInterestingPoint.isPrivate = true;
        createdInterestingPoint = null;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        weike.interestingPointsChannel.on('push-new-mention-in-interesting-point', function(data){
          setTimeout(function(){
            data.should.eql(createdInterestingPoint);
            waiter1();
          }, 100);
        });
        baixin.interestingPointsChannel.on('push-new-shared-interesting-point', waiter.addWaitingFunction(function(data){
          setTimeout(function(){
            data.should.eql(createdInterestingPoint);
            waiter2();
          }, 100);
        }));
        wangyu.interestingPointsChannel.on('push-interesting-point-updated', function(data){
          data.should.fail('同个页面的用户收到了私有兴趣点更新');
        });
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          createdInterestingPoint = data.createdInterestingPoint;
        });
      });
      can('若是私有兴趣点，兴趣点数据只有被分享的用户能够查询，其他用户查询不到', function(done){
        requestCreateANewWebInterestingPoint.isPrivate = true;
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          wangyu.locationsChannel.emit('retrieve-interesting-points', {
            lid: data.createdInterestingPoint.withinLocation.lid,
            offset: 0,
            count: 10
          }, function(notFoundData){
            notFoundData.should.have.property('result');
            notFoundData.should.have.property('errors');
            notFoundData.should.have.property('interestingPoints');
            notFoundData.result.should.eql('success');
            notFoundData.errors.length.should.eql(0);
            notFoundData.interestingPoints.length.should.eql(0);
            baixin.locationsChannel.emit('retrieve-interesting-points', {
              lid: data.createdInterestingPoint.withinLocation.lid,
              offset: 0,
              count: 10
            }, function(foundData){
              foundData.should.have.property('result');
              foundData.should.have.property('errors');
              foundData.should.have.property('interestingPoints');
              foundData.result.should.eql('success');
              foundData.errors.length.should.eql(0);
              foundData.interestingPoints.length.should.above(0);
              done();
            });
          });
        });
      });
      can('若是私有兴趣点，只有自己、被@、被分享的用户能够在该location的参与用户在查询到创建者', function(done){
        requestCreateANewWebInterestingPoint.isPrivate = true;
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
          var createdInterestingPoint;
          data.should.have.property('result', 'success');
          createdInterestingPoint = data.createdInterestingPoint;
          wangyu.locationsChannel.emit('retrieve-attended-users', {
            lid: createdInterestingPoint.withinLocation.lid
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
            }()).should.not.includeEql(xiaodongInfo.uid);
            xiaodong.locationsChannel.emit('retrieve-attended-users', {
              lid: createdInterestingPoint.withinLocation.lid
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
              }()).should.includeEql(xiaodongInfo.uid);
              baixin.locationsChannel.emit('retrieve-attended-users', {
                lid: createdInterestingPoint.withinLocation.lid
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
                }()).should.includeEql(xiaodongInfo.uid);
                done();
              });
            });
          });
        });
      });
    });
  });
}).call(this);
