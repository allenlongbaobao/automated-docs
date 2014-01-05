(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//remove-friend-list/fixture/';
  describe('unit/ test -- remove-friend-list', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//remove-friend-list', ['users'], done);
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
      can('小东删除好友分组，大学同学，得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('remove-friend-list', {
            listName: '大学同学'
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
      can('小东删除好友分组，大学同学，得到正确信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('remove-friend-list', {
            listName: '大学同学'
          }, function(data){
            data.should.have.property('result', 'success');
            done();
          });
        });
      });
      can('小东删除好友分组，大学同学，登出，再次登录，原先在该分组中的好友移动到了未分组中', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('remove-friend-list', {
            listName: '大学同学'
          }, function(data){
            xiaodong.usersChannel.emit('logout', {
              token: 'uid-1'
            }, function(data){
              xiaodong.usersChannel.emit('login', {
                token: 'uid-1'
              }, function(data){
                xiaodong.usersChannel.emit('retrieve-active-friends', {}, function(data){
                  data.should.have.property('activeFriends');
                  data.should.have.property('activeFriends')['with'].lengthOf(1);
                  data.activeFriends[0].should.have.property('users')['with'].lengthOf(2);
                  done();
                });
              });
            });
          });
        });
      });
      can('小东删除好友分组，小学同学（不存在）, 得到出错信息 ', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('remove-friend-list', {
            listName: '小学同学'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
      can("小东删除默认分组 '未分组', 得到出错信息", function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('remove-friend-list', {
            listName: '未分组'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
  });
}).call(this);
