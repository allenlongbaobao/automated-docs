(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//create-friend-list/fixture/';
  describe('unit/ test -- create-friend-list', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//create-friend-list', ['users'], done);
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
      can('小东创建新的好友分组，得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('create-friend-list', {
            listName: '小学同学'
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
      can('小东创建新的好友分组， 得到创建成功信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('create-friend-list', {
            listName: '小学同学'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('newFriendList');
            done();
          });
        });
      });
      can('小东创建新的好友分组， 登出，再次登录， 获取好友，可以看到新创建的分组', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('create-friend-list', {
            listName: '小学同学'
          }, function(data){
            xiaodong.usersChannel.emit('logout', {
              token: 'uid-1'
            }, function(data){
              xiaodong.usersChannel.emit('login', {
                token: 'uid-1'
              }, function(data){
                xiaodong.usersChannel.emit('retrieve-active-friends', {}, function(data){
                  data.should.have.property('result', 'success');
                  data.should.have.property('activeFriends')['with'].lengthOf(3);
                  done();
                });
              });
            });
          });
        });
      });
      can('小东创建新的好友分组， 已存在该分组， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('create-friend-list', {
            listName: '大学同学'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
  });
}).call(this);
