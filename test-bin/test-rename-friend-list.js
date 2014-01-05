(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//rename-friend-list/fixture/';
  describe('unit/ test -- rename-friend-list', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//rename-friend-list', ['users'], done);
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
        loggedIn: false
      };
      can('小东重命名好友分组， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('rename-friend-list', {
            oldListName: '大学同学',
            newListName: '小学同学'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('小东已登录', function(){
      var xiaodong;
      xiaodong = null;
      beforeEach(function(done){
        var xiaodongInfo;
        xiaodongInfo = {
          uid: 'uid-1',
          loggedIn: true
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('小东重命名好友分组， 得到正确响应', function(done){
        xiaodong.usersChannel.emit('rename-friend-list', {
          oldListName: '大学同学',
          newListName: '小学同学'
        }, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
      can('小东重命名好友分组， 原分组为默认分组‘未分组’，得到出错信息', function(done){
        xiaodong.usersChannel.emit('rename-friend-list', {
          oldListName: '未分组',
          newListName: '小学同学'
        }, function(data){
          data.should.have.property('result', 'failed');
          done();
        });
      });
      can('小东重命名好友分组， 原分组名不存在， 得到出错信息', function(done){
        xiaodong.usersChannel.emit('rename-friend-list', {
          oldListName: '中学同学',
          newListName: '小学同学'
        }, function(data){
          data.should.have.property('result', 'failed');
          done();
        });
      });
      can('小东重命名好友分组 ，新分组名为已存在的分组名， 得到出错信息', function(done){
        xiaodong.usersChannel.emit('rename-friend-list', {
          oldListName: '大学同学',
          newListName: '未分组'
        }, function(data){
          data.should.have.property('result', 'failed');
          done();
        });
      });
    });
  });
}).call(this);
