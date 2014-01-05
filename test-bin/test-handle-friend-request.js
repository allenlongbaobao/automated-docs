(function(){
  var FIXTURE_PATH, checkFriendDataInDbCorrectly;
  FIXTURE_PATH = 'unit//handle-friend-request/fixture/';
  describe('unit/ test -- handle-friend-request', function(){
    var xiaodong, baixin;
    xiaodong = baixin = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//handle-friend-request', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('pending user offline', function(){
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
            xiaodong.usersChannel.emit('update-status', {
              status: 'offline'
            }, function(data){
              done();
            });
          });
        });
      });
      can('柏信对于好友请求做同意处理, 小东能收到新增好友提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.usersChannel.on('push-friend-request-confirm', function(data){
          data.should.have.property('type', 'accepted');
          waiter2();
        });
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'accepted',
          uid: 'uid-1'
        }, function(data){
          waiter1();
        });
      });
      can('柏信对于好友请求做拒绝处理, 小东能收到好友请求被拒绝的提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.usersChannel.on('push-friend-request-confirm', function(data){
          data.should.have.property('type', 'rejected');
          waiter2();
        });
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'rejected',
          uid: 'uid-1'
        }, function(data){
          waiter1();
        });
      });
    });
    describe('pending user invisible', function(){
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
            xiaodong.usersChannel.emit('update-status', {
              status: 'invisible'
            }, function(data){
              done();
            });
          });
        });
      });
      can('柏信对于好友请求做同意处理, 小东能够收到新增好友提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.usersChannel.on('push-friend-request-confirm', function(data){
          data.should.have.property('type', 'accepted');
          waiter2();
        });
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'accepted',
          uid: 'uid-1'
        }, function(data){
          waiter1();
        });
      });
      can('柏信对好友请求做拒绝处理, 小东能够收到被拒绝的提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.usersChannel.on('push-friend-request-confirm', function(data){
          data.should.have.property('type', 'rejected');
          waiter2();
        });
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'rejected',
          uid: 'uid-1'
        }, function(data){
          waiter1();
        });
      });
    });
    describe('pending user online', function(){
      var xiaodongInfo, baixinInfo;
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
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannels){
          socketHelper.getClient(baixinInfo, function(baixinChannels){
            xiaodong = xiaodongChannels;
            baixin = baixinChannels;
            done();
          });
        });
      });
      can('柏信对于好友请求不做处理， 下次登录时， reuqested-user中应该有小东', function(done){
        baixin.usersChannel.emit('logout', {
          token: baixinInfo.uid
        }, function(data){
          baixin.usersChannel.emit('login', {
            token: baixinInfo.uid
          }, function(data){
            baixin.usersChannel.emit('retrieve-requested-friends', {}, function(data){
              data.should.have.property('result', 'success');
              data.should.have.property('requestedFriends');
              data.should.have.property('requestedFriends')['with'].lengthOf(1);
              done();
            });
          });
        });
      });
      can('柏信对于好友请求做同意处理, 服务端能返回正确处理结果', function(done){
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'accepted',
          uid: 'uid-1'
        }, function(data){
          data.should.have.property('result', 'success');
          data.newFriend.should.have.property('_id');
          data.newFriend.should.have.property('username');
          data.newFriend.should.have.property('gender');
          data.newFriend.should.have.property('email');
          data.newFriend.should.have.property('avatar');
          data.newFriend.should.have.property('signature');
          data.newFriend.should.have.property('status');
          done();
        });
      });
      can('柏信对于好友请求做同意处理, 小东能够收到新增好友提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.usersChannel.on('push-friend-request-confirm', function(data){
          data.should.have.property('type', 'accepted');
          waiter2();
        });
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'accepted',
          uid: 'uid-1'
        }, function(data){
          waiter1();
        });
      });
      can('柏信对于好友请求做同意处理，下次登录时， requestd-user中不应该有小东', function(done){
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'accepted',
          uid: 'uid-1'
        }, function(data){
          baixin.usersChannel.emit('logout', {
            token: baixinInfo.uid
          }, function(data){
            baixin.usersChannel.emit('login', {
              token: baixinInfo.uid
            }, function(data){
              baixin.usersChannel.emit('retrieve-requested-friends', {}, function(data){
                data.should.have.property('result', 'success');
                data.should.have.property('requestedFriends');
                data.should.have.property('requestedFriends')['with'].lengthOf(0);
                done();
              });
            });
          });
        });
      });
      can('柏信对于好友请求做同意处理, 数据库应该得到更新', function(done){
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'accepted',
          uid: 'uid-1'
        }, function(data){
          checkFriendDataInDbCorrectly('uid-2', 'uid-1', 'active', function(){
            checkFriendDataInDbCorrectly('uid-1', 'uid-2', 'accepted', function(){
              done();
            });
          });
        });
      });
      can('柏信对于好友请求做拒绝处理, 服务器能返回正确处理结果', function(done){
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'rejected',
          uid: 'uid-1'
        }, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
      can('柏信对于好友请求做拒绝处理, 数据库应该得到更新', function(done){
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'rejected',
          uid: 'uid-1'
        }, function(data){
          checkFriendDataInDbCorrectly('uid-1', 'uid-2', 'rejected', function(){
            done();
          });
        });
      });
      can('柏信对于好友请求做拒绝处理， 下次登录时，requested-user中不应该有小东', function(done){
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'rejected',
          uid: 'uid-1'
        }, function(data){
          baixin.usersChannel.emit('logout', {
            token: baixinInfo.uid
          }, function(data){
            baixin.usersChannel.emit('login', {
              token: baixinInfo.uid
            }, function(data){
              baixin.usersChannel.emit('retrieve-requested-friends', {}, function(data){
                data.should.have.property('result', 'success');
                data.should.have.property('requestedFriends');
                data.should.have.property('requestedFriends')['with'].lengthOf(0);
                done();
              });
            });
          });
        });
      });
      can('柏信对于好友请求做拒绝处理, 小东能够收到好友请求被拒绝的提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.usersChannel.on('push-friend-request-confirm', function(data){
          data.should.have.property('type', 'rejected');
          data.requestedUser.should.have.property('_id');
          data.requestedUser.should.have.property('username');
          data.requestedUser.should.have.property('gender');
          data.requestedUser.should.have.property('email');
          data.requestedUser.should.have.property('avatar');
          data.requestedUser.should.have.property('signature');
          data.requestedUser.should.have.property('status');
          waiter2();
        });
        baixin.usersChannel.emit('handle-friend-request', {
          type: 'rejected',
          uid: 'uid-1'
        }, function(data){
          waiter1();
        });
      });
    });
  });
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
