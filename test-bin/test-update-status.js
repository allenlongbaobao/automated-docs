(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//update-status/fixture/';
  describe('unit/ test -- update-status', function(){
    var xiaodongInfo, baixinInfo, getClientStatus;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//update-status', ['users', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    xiaodongInfo = {
      loggedIn: true,
      uid: 'uid-1',
      urls: ['http://www.some.com']
    };
    baixinInfo = {
      loggedIn: true,
      uid: 'uid-2',
      urls: ['http://www.some.com']
    };
    getClientStatus = function(status){
      if (status === 'online') {
        return 'online';
      } else {
        return 'offline';
      }
    };
    can('请求报文出错时，能够给回出错信息', function(done){
      socketHelper.getClient(xiaodongInfo, function(xiaodong){
        xiaodong.usersChannel.emit('update-status', {
          thisPropertyCannotAppearHere: true
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          xiaodong.usersChannel.emit('update-status', {
            status: 'this is a invalid status'
          }, function(data){
            data.should.have.property('result', 'failed');
            data.should.have.property('errors');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
    });
    can('用户未登录时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(client){
        client.usersChannel.emit('update-status', {
          status: 'online'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('成功改变状态后', function(){
      var status, validStatus;
      status = null;
      validStatus = ['online', 'offline', 'invisible'];
      beforeEach(function(done){
        var randomIndex;
        randomIndex = Math.random() * validStatus.length >> 0;
        status = validStatus[randomIndex];
        done();
      });
      can('能够收到操作成功的响应', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('update-status', {
            status: status
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            done();
          });
        });
      });
      can('好友能够收到通知', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            baixin.usersChannel.on('push-user-presence-updated', function(data){
              data.should.have.property('status', getClientStatus(status));
              data.should.have.property('_id', xiaodongInfo.uid);
              data.should.have.property('username');
              data.should.have.property('avatar');
              data.should.have.property('signature');
              data.should.have.property('gender');
              data.should.have.property('email');
              waiter1();
            });
            xiaodong.usersChannel.emit('update-status', {
              status: status
            }, function(data){
              data.should.have.property('result', 'success');
              waiter2();
            });
          });
        });
      });
      can('同一个location的用户能够收到通知', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            baixin.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.location.should.have.property('url', '');
              data.should.have.property('user');
              data.user.should.have.property('_id', xiaodongInfo.uid);
              data.user.should.have.property('username');
              data.user.should.have.property('avatar');
              data.user.should.have.property('signature');
              data.user.should.have.property('gender');
              data.user.should.have.property('email');
              data.should.have.property('action', status === 'online' ? 'join' : 'leave');
              waiter1();
            });
            xiaodong.usersChannel.emit('update-status', {
              status: status
            }, function(data){
              data.should.have.property('result', 'success');
              waiter2();
            });
          });
        });
      });
      can('在用户曾经参与过的location的其他用户能够收到通知', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            baixin.locationsChannel.on('push-attended-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.should.have.property('user');
              data.user.should.have.property('status', getClientStatus(status));
              data.user.should.have.property('_id', xiaodongInfo.uid);
              data.user.should.have.property('username');
              data.user.should.have.property('avatar');
              data.user.should.have.property('signature');
              data.user.should.have.property('gender');
              data.user.should.have.property('email');
              data.user.should.have.property('status', getClientStatus(status));
              waiter1();
            });
            xiaodong.usersChannel.emit('update-status', {
              status: status
            }, function(data){
              data.should.have.property('result', 'success');
              waiter2();
            });
          });
        });
      });
    });
    describe('当用户切换到离线状态后', function(){
      var xiaodong;
      xiaodong = null;
      beforeEach(function(done){
        socketHelper.getClient(xiaodongInfo, function(client){
          client.usersChannel.emit('update-status', {
            status: 'offline'
          }, function(data){
            data.should.have.property('result', 'success');
            xiaodong = client;
            done();
          });
        });
      });
      can('无法进行需要登录的操作', function(done){
        xiaodong.usersChannel.emit('send-friend-request', {
          uid: 'uid-3'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件send-friend-request需要登录才能完成'
          });
          done();
        });
      });
      can('可以改变到在线或者隐身状态，并恢复操作能力', function(done){
        xiaodong.usersChannel.emit('update-status', {
          status: 'online'
        }, function(data){
          data.should.have.property('result', 'success');
          xiaodong.usersChannel.emit('send-friend-request', {
            uid: 'uid-3'
          }, function(data){
            data.should.have.property('result', 'success');
            done();
          });
        });
      });
    });
  });
}).call(this);
