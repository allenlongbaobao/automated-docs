(function(){
  var FIXTURE_PATH, requestRemoveFriendsData;
  FIXTURE_PATH = 'unit//remove-friends/fixture/';
  describe('unit/ test -- remove-friends', function(){
    var xiaodong, baixin, wangyu;
    xiaodong = baixin = wangyu = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//remove-friends', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('handler logged out', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: false
        }, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('小东删除好友柏信, 系统提醒其未登录', function(done){
        xiaodong.usersChannel.emit('remove-friends', {
          uids: ['uid-2']
        }, function(data){
          data.should.have.property('result', 'failed');
          done();
        });
      });
    });
    describe('removed user offline', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: false
          }, function(baixinChannels){
            xiaodong = xiaodongChannels;
            baixin = baixinChannels;
            done();
          });
        });
      });
      can('小东删除好友柏信, 柏信不能收到消息提示', function(done){
        baixin.usersChannel.on('push-friend-updated', function(data){
          data.should.fail('柏信不能收到消息提示');
        });
        xiaodong.usersChannel.emit('remove-friends', requestRemoveFriendsData, function(data){
          setTimeout(function(){
            done();
          }, 10);
        });
      });
    });
    describe('removed user online', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannels){
            xiaodong = xiaodongChannels;
            baixin = baixinChannels;
            done();
          });
        });
      });
      can('小东发送删除好友柏信的请求, 能够收到操作成功的响应', function(done){
        xiaodong.usersChannel.emit('remove-friends', requestRemoveFriendsData, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
    });
    describe('removed user online', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannels){
            xiaodong = xiaodongChannels;
            baixin = baixinChannels;
            done();
          });
        });
      });
      can('小东发送删除好友柏信的请求, 柏信能够收到消息提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.usersChannel.on('push-friend-updated', function(data){
          data.should.have.property('type', 'removed');
          data.user.should.have.property('_id');
          data.user.should.have.property('username');
          data.user.should.have.property('gender');
          data.user.should.have.property('email');
          data.user.should.have.property('avatar');
          data.user.should.have.property('signature');
          waiter2();
        });
        xiaodong.usersChannel.emit('remove-friends', requestRemoveFriendsData, function(data){
          waiter1();
        });
      });
    });
    describe('removed user online', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannels){
            xiaodong = xiaodongChannels;
            baixin = baixinChannels;
            done();
          });
        });
      });
      can('柏信发送删除好友小东的请求, 能够收到操作成功的响应', function(done){
        baixin.usersChannel.emit('remove-friends', {
          uids: ['uid-1']
        }, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
    });
    describe('removed user online', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannels){
            xiaodong = xiaodongChannels;
            baixin = baixinChannels;
            done();
          });
        });
      });
      can('柏信发送删除好友小东的请求, 小东能够收到消息提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.usersChannel.on('push-friend-updated', function(data){
          data.should.have.property('type', 'removed');
          waiter2();
        });
        baixin.usersChannel.emit('remove-friends', {
          uids: ['uid-1']
        }, function(data){
          waiter1();
        });
      });
    });
    describe("removed user not it's friend", function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('柏信发送删除好友王瑜的请求， 但是王瑜不是柏信的好友， 得到错误信息', function(done){
        xiaodong.usersChannel.emit('remove-friends', {
          uids: ['uid-3']
        }, function(data){
          data.result.should.eql('failed');
          done();
        });
      });
    });
    describe("removed user not it's friend", function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-3',
          loggedIn: true
        }, function(wangyuChannels){
          wangyu = wangyuChannels;
          done();
        });
      });
      can('王瑜发送删除好友柏信的请求， 但是柏信不是王瑜的好友， 得到错误信息', function(done){
        wangyu.usersChannel.emit('remove-friends', {
          uids: ['uid-1']
        }, function(data){
          data.result.should.eql('failed');
          done();
        });
      });
    });
  });
  requestRemoveFriendsData = utils.loadFixture(FIXTURE_PATH + '/request-remove-friends');
}).call(this);
