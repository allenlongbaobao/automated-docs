(function(){
  var FIXTURE_PATH, requestCreateANewWebInterestingPointOnANewUrl;
  FIXTURE_PATH = 'integrated/create-a-new-web-interesting-point-on-a-new-url/fixture/';
  requestCreateANewWebInterestingPointOnANewUrl = utils.loadFixture(FIXTURE_PATH + 'request-create-a-new-web-interesting-point-on-a-new-url');
  describe('integrated test -- create-a-new-web-interesting-point-on-a-new-url', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/create-a-new-web-interesting-point-on-a-new-url', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('创建过程中', function(){
      can('当创建报文出错时，能够给回出错提示', function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(client, datas){
          client.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', {}, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
      can('当用户未登录时，能够给回未登录提示', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(client, datas){
          client.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('failed');
            data.errors.should.includeEql({
              message: '事件create-a-new-web-interesting-point-on-a-new-url需要登录才能完成'
            });
            done();
          });
        });
      });
    });
    describe('新的公有兴趣点创建成功后', function(){
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
                xiaodong = xiaodongChannels;
                baixin = baixinChannels;
                wangyu = wangyuChannels;
                weike = weikeChannels;
                requestCreateANewWebInterestingPointOnANewUrl.withinLocation.url = xiaodongInfo.urls[0];
                requestCreateANewWebInterestingPointOnANewUrl.content = "@weike 好吧。。";
                requestCreateANewWebInterestingPointOnANewUrl.isPrivate = false;
                requestCreateANewWebInterestingPointOnANewUrl.sharedWith = [baixinInfo.uid];
                done();
              });
            });
          });
        });
      });
      can('创建者能够收到返回的兴趣点对象和location对象', function(done){
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.should.have.property('createdLocation');
          data.should.have.property('createdInterestingPoint');
          data.result.should.eql('success');
          data.errors.length.should.eql(0);
          data.createdInterestingPoint.should.have.property('interestingPointSession');
          done();
        });
      });
      can('创建者的客户端能够收到服务端的询问内部性请求', function(done){
        var createdLocation;
        createdLocation = null;
        xiaodong.locationsChannel.on('ask-location-internality', function(data){
          setTimeout(function(){
            data.should.have.property('lid');
            data.should.have.property('retrievedHtml');
            data.lid.should.eql(createdLocation._id);
            done();
          }, 100);
        });
        baixin.locationsChannel.on('ask-location-internality', function(data){
          data.should.fail('非创建者收到了服务端的内部性询问请求');
        });
        xiaodong.interestingPointsChannel.emit("create-a-new-web-interesting-point-on-a-new-url", requestCreateANewWebInterestingPointOnANewUrl, function(data){
          createdLocation = data.createdLocation;
        });
      });
      can('创建者客户端回答内部性请求后，同一个页面的用户能够收到location更新', function(done){
        var waiter, waiter1, waiter2, waiter3, createdLocation;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        createdLocation = null;
        xiaodong.locationsChannel.on('ask-location-internality', function(data){
          xiaodong.locationsChannel.emit('answer-location-internality', {
            result: 'success',
            isInternal: false,
            lid: data.lid
          }, function(data){
            data.should.have.property('result');
            data.should.have.property('errors');
            data.result.should.eql('success');
            data.errors.length.should.eql(0);
          });
        });
        wangyu.locationsChannel.on('push-location-updated', function(data){
          setTimeout(function(){
            data.should.have.property('_id');
            data._id.should.eql(createdLocation._id);
            waiter1();
          }, 100);
        });
        xiaodong.locationsChannel.on('push-location-updated', function(data){
          setTimeout(function(){
            data.should.have.property('_id');
            data._id.should.eql(createdLocation._id);
            waiter2();
          }, 100);
        });
        baixin.locationsChannel.on('push-location-updated', function(data){
          data.should.fail('不在同一个页面的用户收到了更新消息推送');
        });
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
          createdLocation = data.createdLocation;
          waiter3();
        });
      });
      can('被@到的用户能够收到新的推送消息', function(done){
        var createdInterestingPoint;
        createdInterestingPoint = null;
        weike.interestingPointsChannel.on('push-new-mention-in-interesting-point', function(data){
          setTimeout(function(){
            data.should.eql(createdInterestingPoint);
            done();
          }, 100);
        });
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
          createdInterestingPoint = data.createdInterestingPoint;
        });
      });
      can('其他用户到达location，能够获取location信息', function(done){
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
          socketHelper.getClient({
            loggedIn: false,
            urls: data.createdLocation.urls
          }, function(newClient, responseData){
            responseData.locationsChannel.should.have.property('locations');
            responseData.locationsChannel.should.have.property('inexistenceLocations');
            responseData.locationsChannel.locations.length.should.eql(1);
            responseData.locationsChannel.locations[0]._id.should.eql(data.createdLocation._id);
            done();
          });
        });
      });
      can('若是私有兴趣点，只有被@到和被分享的用户能够收到消息通知', function(done){
        var waiter, waiterFn1, waiterFn2;
        requestCreateANewWebInterestingPointOnANewUrl.isPrivate = true;
        waiter = new utils.AllDoneWaiter(done);
        waiterFn1 = waiter.addWaitingFunction();
        waiterFn2 = waiter.addWaitingFunction();
        weike.interestingPointsChannel.on('push-new-mention-in-interesting-point', function(data){
          waiterFn1();
        });
        baixin.interestingPointsChannel.on('push-new-shared-interesting-point', function(data){
          waiterFn2();
        });
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){});
      });
      can('若是私有兴趣点，被@和被分享的用户可以查询，其他用户无法查询', function(done){
        requestCreateANewWebInterestingPointOnANewUrl.isPrivate = true;
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
          var location;
          location = data.createdLocation;
          wangyu.locationsChannel.emit('retrieve-interesting-points', {
            lid: location._id
          }, function(data){
            data.should.have.property('interestingPoints');
            data.interestingPoints.length.should.eql(0);
            weike.locationsChannel.emit('retrieve-interesting-points', {
              lid: location._id
            }, function(data){
              data.should.have.property('interestingPoints');
              data.interestingPoints.length.should.above(0);
              done();
            });
          });
        });
      });
      can('若是公有兴趣点，兴趣点和会话都能够被查询到', function(done){
        xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
          weike.interestingPointsChannel.emit('retrieve-interesting-point-sessions', {
            ipid: data.createdInterestingPoint._id,
            limit: 10,
            skip: 0
          }, function(data){
            data.should.have.property('result', 'success');
            data.interestingPointSessions.length.should.above(0);
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
            data.location.should.have.property('id');
            data.user.should.have.property('_id', xiaodongInfo.uid);
            data.user.should.have.property('status', 'online');
            waiter1();
          });
          xiaodong.interestingPointsChannel.emit('create-a-new-web-interesting-point-on-a-new-url', requestCreateANewWebInterestingPointOnANewUrl, function(data){
            data.should.have.property('result', 'success');
            waiter2();
          });
        });
      });
    });
  });
}).call(this);
