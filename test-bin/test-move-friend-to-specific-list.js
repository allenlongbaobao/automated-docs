(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//move-friend-to-specific-list/fixture/';
  describe('unit/ test -- move-friend-to-specific-list', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//move-friend-to-specific-list', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('小东未登录', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: false,
        urls: ['http://www.some.com']
      };
      can('小东移动好友， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('move-friend-to-specific-list', {
            uid: 'uid-2',
            specificListName: '大学同学'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('小东已登录', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      can('小东移动正确好友到正确的分组，得到正确信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('move-friend-to-specific-list', {
            uid: 'uid-2',
            specificListName: '大学同学'
          }, function(data){
            data.should.have.property('result', 'success');
            done();
          });
        });
      });
      can('小东移动正确好友到已存在分组， 登录， 再次登录，获取好友，移动成功', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('move-friend-to-specific-list', {
            uid: 'uid-2',
            specificListName: '大学同学'
          }, function(data){
            xiaodong.usersChannel.emit('logout', {
              token: 'uid-1'
            }, function(data){
              xiaodong.usersChannel.emit('login', {
                token: 'uid-1'
              }, function(data){
                xiaodong.usersChannel.emit('retrieve-active-friends', {}, function(data){
                  data.activeFriends[1].should.have.property('users')['with'].lengthOf(1);
                  done();
                });
              });
            });
          });
        });
      });
      can('小东移动不存在的好友至已存在的分组， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('move-friend-to-specific-list', {
            uid: 'uid-10',
            specificListName: '大学同学'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
      can('小东移动非好友至已存在的分组， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('move-friend-to-specific-list', {
            uid: 'uid-3',
            specificListName: '大学同学'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
      can('小东移动存在的好友至不存在的分组， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('move-friend-to-specific-list', {
            uid: 'uid-2',
            specificListName: '小学同学'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
  });
}).call(this);
