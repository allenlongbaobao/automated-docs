(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-interesting-points/fixture/';
  describe('unit test -- retrieve-interesting-points', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-interesting-points', ['users', 'locations', 'interesting-points', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels, responseData){
        channels.locationsChannel.emit('retrieve-interesting-points', {}, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.result.should.eql('failed');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('成功查询时', function(done){
      var xiaodongInfo, baixinInfo, wangyuInfo, xiaodong, baixin, wangyu;
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
      xiaodong = baixin = wangyu = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannel, responseData){
          socketHelper.getClient(baixinInfo, function(baixinChannel, responseData){
            socketHelper.getClient(wangyuInfo, function(wangyuChannel, responseData){
              xiaodong = xiaodongChannel;
              baixin = baixinChannel;
              wangyu = wangyuChannel;
              done();
            });
          });
        });
      });
      can('能够返回正确的兴趣点数组', function(done){
        xiaodong.locationsChannel.emit('retrieve-interesting-points', {
          lid: 'lid-1',
          offset: 1,
          count: 7
        }, function(data){
          data.result.should.eql('success');
          data.errors.length.should.eql(0);
          data.interestingPointsCount.should.eql(10);
          data.interestingPoints.length.should.eql(7);
          data.interestingPoints[0]._id.should.eql('ipid-2');
          done();
        });
      });
      can('未登录用户只能查询到公有兴趣点', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(channels){
          channels.locationsChannel.emit('retrieve-interesting-points', {
            lid: 'lid-1'
          }, function(data){
            data.result.should.eql('success');
            data.interestingPointsCount.should.eql(10);
            data.errors.length.should.eql(0);
            data.interestingPoints.length.should.eql(5);
            done();
          });
        });
      });
      can('登录用户中，只有被@和被分享的用户能够查询到私有兴趣点', function(done){
        baixin.locationsChannel.emit('retrieve-interesting-points', {
          lid: 'lid-1'
        }, function(data){
          data.interestingPointsCount.should.eql(10);
          data.interestingPoints.length.should.eql(9);
          wangyu.locationsChannel.emit('retrieve-interesting-points', {
            lid: 'lid-1'
          }, function(data){
            data.interestingPointsCount.should.eql(10);
            data.interestingPoints.length.should.eql(8);
            xiaodong.locationsChannel.emit('retrieve-interesting-points', {
              lid: 'lid-1'
            }, function(data){
              data.interestingPointsCount.should.eql(10);
              data.interestingPoints.length.should.eql(10);
              done();
            });
          });
        });
      });
    });
  });
}).call(this);
