(function(){
  var FIXTURE_PATH, requestSendFriendRequestData, checkFriendDataInDbCorrectly;
  FIXTURE_PATH = 'unit//send-friend-request/fixture/';
  describe('unit/ test -- send-friend-request', function(){
    var xiaodong, baixin;
    xiaodong = baixin = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//send-friend-request', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('requested user offline', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannel){
          socketHelper.getClient({
            loggedIn: false
          }, function(baixinChannel){
            xiaodong = xiaodongChannel;
            baixin = baixinChannel;
            done();
          });
        });
      });
      can('小东向柏信发送好友请求, 柏信不在线, 不能收到推送信息', function(done){
        baixin.usersChannel.on('push-new-friend-request', function(data){
          data.should.fail('柏信不在线, 不能收到推送信息');
        });
        xiaodong.usersChannel.emit('send-friend-request', requestSendFriendRequestData, function(data){
          setTimeout(function(){
            done();
          }, 100);
        });
      });
    });
    describe('requested user online', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannel){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannel){
            xiaodong = xiaodongChannel;
            baixin = baixinChannel;
            done();
          });
        });
      });
      can('用户小东向用户柏信发送好友添加请求, 收到发送成功回复', function(done){
        xiaodong.usersChannel.emit('send-friend-request', requestSendFriendRequestData, function(data){
          data.result.should.eql('success');
          done();
        });
      });
      can('用户小东向柏信发送好友添加请求, 柏信在线, 能够收到请求提示', function(done){
        baixin.usersChannel.on('push-new-friend-request', function(data){
          data.should.have.property('_id');
          data.should.have.property('username');
          data.should.have.property('gender');
          data.should.have.property('email');
          data.should.have.property('avatar');
          data.should.have.property('signature');
          data.should.have.property('status');
          done();
        });
        xiaodong.usersChannel.emit('send-friend-request', requestSendFriendRequestData, function(data){});
      });
      can('用户小东向柏信发送好友添加请求, 在数据库中,两人的users应该写入数据', function(done){
        xiaodong.usersChannel.emit('send-friend-request', requestSendFriendRequestData, function(data){
          checkFriendDataInDbCorrectly('uid-1', 'uid-2', 'pending', function(){
            checkFriendDataInDbCorrectly('uid-2', 'uid-1', 'requested', function(){
              done();
            });
          });
        });
      });
    });
    describe('请求加已经是好友的用户为好友，返回错误信息', function(done){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannel){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannel){
            xiaodong = xiaodongChannel;
            baixin = baixinChannel;
            done();
          });
        });
      });
      can('用户小东向柏信发送好友请求， 柏信接受后， 小东再次向柏信发送好友请求，收到错误信息', function(done){
        var waiter, waiter1, waiter2, waiter3;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        baixin.usersChannel.on('push-new-friend-request', function(data){
          baixin.usersChannel.emit('handle-friend-request', {
            uid: 'uid-1',
            type: 'accepted'
          }, function(data){
            waiter2();
          });
        });
        xiaodong.usersChannel.emit('send-friend-request', requestSendFriendRequestData, function(data){
          waiter1();
        });
        setTimeout(function(){
          xiaodong.usersChannel.emit('send-friend-request', requestSendFriendRequestData, function(data){
            data.should.have.property('result', 'failed');
            waiter3();
          });
        }, 500);
      });
    });
  });
  requestSendFriendRequestData = utils.loadFixture(FIXTURE_PATH + '/request-send-friend-request');
  checkFriendDataInDbCorrectly = function(userId, friendId, status, callback){
    database.getDb(function(db){
      db.atPlus['users'].findOne({
        _id: userId
      }, function(err, result){
        var ungroupedUsers, i$, len$, user;
        if (err) {
          debug(err);
        }
        ungroupedUsers = (function(){
          var i$, x$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = result.friends).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            if (x$.name === '未分组') {
              results$.push(x$.users);
            }
          }
          return results$;
        }())[0];
        for (i$ = 0, len$ = ungroupedUsers.length; i$ < len$; ++i$) {
          user = ungroupedUsers[i$];
          if (user.uid === friendId) {
            user.status.should.eql(status);
          }
        }
        if (callback) {
          return callback();
        }
      });
    });
  };
}).call(this);
