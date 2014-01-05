(function(){
  var FIXTURE_PATH, requestRetrieveFriendsData;
  FIXTURE_PATH = 'unit//retrieve-friends/fixture/';
  describe('unit/ test -- retrieve-friends', function(){
    var xiaodong, baixin, wangyu, xiaolong, weike;
    xiaodong = baixin = wangyu = xiaolong = weike = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-friends', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('小东未登录', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: false
        }, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('小东未登录, 获取好友时 ,系统提示其先登录', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', requestRetrieveFriendsData, function(data){
          data.should.have.property('result', 'failed');
          done();
        });
      });
    });
    describe('小东已登录', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannels){
            socketHelper.getClient({
              uid: 'uid-3',
              loggedIn: false
            }, function(wangyuChannels){
              socketHelper.getClient({
                uid: 'uid-4',
                loggedIn: false
              }, function(xiaolongChannels){
                socketHelper.getClient({
                  uid: 'uid-5',
                  loggedIn: false
                }, function(weikeChannels){
                  xiaodong = xiaodongChannels;
                  baixin = baixinChannels;
                  wangyu = wangyuChannels;
                  xiaolong = xiaolongChannels;
                  weike = weikeChannels;
                  wangyu.usersChannel.emit('update-status', {
                    status: 'invisible'
                  }, function(data){});
                  xiaolong.usersChannel.emit('update-status', {
                    status: 'offline'
                  }, function(data){});
                  done();
                });
              });
            });
          });
        });
      });
      can('小东获取好友, 偏移量为1, 数量为2', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', {
          offset: 1,
          count: 2
        }, function(data){
          data.should.have.property('result', 'success');
          data.users[0].should.have.property('username');
          data.users[0].should.have.property('_id');
          data.users[0].should.have.property('gender');
          data.users[0].should.have.property('email');
          data.users[0].should.have.property('signature');
          data.users[0].should.have.property('status');
          done();
        });
      });
      can('小东获取好友, 偏移量为2, 数量为2', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', {
          offset: 2,
          count: 2
        }, function(data){
          data.should.have.property('result', 'success');
          data.users[0].should.have.property('username');
          data.users[0].should.have.property('_id');
          data.users[0].should.have.property('gender');
          data.users[0].should.have.property('email');
          data.users[0].should.have.property('signature');
          data.users[0].should.have.property('status');
          done();
        });
      });
      can('小东获取好友, 偏移量为1, 数量为3', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', {
          offset: 1,
          count: 3
        }, function(data){
          data.should.have.property('result', 'success');
          data.users[0].should.have.property('username');
          data.users[0].should.have.property('_id');
          data.users[0].should.have.property('gender');
          data.users[0].should.have.property('email');
          data.users[0].should.have.property('signature');
          data.users[0].should.have.property('status');
          done();
        });
      });
      can('小东获取好友, 偏移量为2, 数量为3', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', {
          offset: 2,
          count: 3
        }, function(data){
          data.should.have.property('result', 'success');
          data.users[0].should.have.property('username');
          data.users[0].should.have.property('_id');
          data.users[0].should.have.property('gender');
          data.users[0].should.have.property('email');
          data.users[0].should.have.property('signature');
          data.users[0].should.have.property('status');
          done();
        });
      });
      can('小东获取好友, 偏移量为1, 数量为4', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', {
          offset: 1,
          count: 4
        }, function(data){
          data.should.have.property('result', 'success');
          data.users[0].should.have.property('username');
          data.users[0].should.have.property('_id');
          data.users[0].should.have.property('gender');
          data.users[0].should.have.property('email');
          data.users[0].should.have.property('signature');
          data.users[0].should.have.property('status');
          done();
        });
      });
      can('小东获取好友, 偏移量为1, 数量为5', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', {
          offset: 1,
          count: 5
        }, function(data){
          data.should.have.property('result', 'success');
          data.users[0].should.have.property('username');
          data.users[0].should.have.property('_id');
          data.users[0].should.have.property('gender');
          data.users[0].should.have.property('email');
          data.users[0].should.have.property('signature');
          data.users[0].should.have.property('status');
          done();
        });
      });
      can('小东获取好友, 偏移量为1, 数量为1', function(done){
        xiaodong.usersChannel.emit('retrieve-friends', {
          offset: 1,
          count: 1
        }, function(data){
          data.should.have.property('result', 'success');
          data.users[0].should.have.property('username');
          data.users[0].should.have.property('_id');
          data.users[0].should.have.property('gender');
          data.users[0].should.have.property('email');
          data.users[0].should.have.property('signature');
          data.users[0].should.have.property('status');
          done();
        });
      });
    });
  });
  requestRetrieveFriendsData = utils.loadFixture(FIXTURE_PATH + '/request-retrieve-friends');
}).call(this);
