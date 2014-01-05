(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/login/fixture/';
  describe('unit test -- login', function(){
    var xiaodong, baixin, wangyu;
    xiaodong = baixin = wangyu = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/login', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回出错报文', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(client){
        client.usersChannel.emit('login', {
          thisPropertyCannotAppearHere: true
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('传递的token找不到用户时，能够给回出错反馈', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(client){
        client.usersChannel.emit('login', {
          token: 'this is a token which cannot find a user.'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('登录成功后', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo;
      xiaodongInfo = {
        loggedIn: true,
        uid: 'uid-1',
        urls: ['http://www.some.com']
      };
      baixinInfo = {
        loggedIn: true,
        uid: 'uid-2'
      };
      wangyuInfo = {
        loggedIn: true,
        uid: 'uid-3',
        urls: ['http://www.some.com']
      };
      can('能够返回正确的用户信息', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          xiaodong.usersChannel.emit('login', {
            token: xiaodongInfo.uid
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('user');
            data.user.should.have.property('_id', xiaodongInfo.uid);
            data.user.should.have.property('username', 'xiaodong');
            done();
          });
        });
      });
      can('能够加入到好友的rooms中', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          xiaodong.usersChannel.on('push-user-presence-updated', function(data){
            data.should.have.property('_id', baixinInfo.uid);
            data.should.have.property('username', 'baixin');
            data.should.have.property('status', 'online');
            waiter1();
          });
          xiaodong.usersChannel.emit('login', {
            token: xiaodongInfo.uid
          }, function(data){
            socketHelper.getClient(baixinInfo, function(baixin){
              waiter2();
            });
          });
        });
      });
      can('好友能够收到用户的上线通知', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(baixinInfo, function(baixin){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            baixin.usersChannel.on('push-user-presence-updated', function(data){
              data.should.have.property('_id', xiaodongInfo.uid);
              data.should.have.property('username', 'xiaodong');
              waiter1();
            });
            wangyu.usersChannel.on('push-user-presence-updated', function(data){
              data.should.fail('非好友收到了用户的上线通知');
            });
            socketHelper.getClient({
              loggedIn: false
            }, function(xiaodong){
              xiaodong.usersChannel.emit('login', {
                token: xiaodongInfo.uid
              }, function(data){
                setTimeout(function(){
                  waiter2();
                }, 100);
              });
            });
          });
        });
      });
      can('在同个location的用户能够收到通知', function(done){
        socketHelper.getClient({
          loggedIn: false,
          urls: ['http://www.some.com']
        }, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            wangyu.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('location');
              data.should.have.property('user');
              data.should.have.property('action', 'join');
              data.location.should.have.property('id', 'lid-1');
              data.user.should.have.property('_id', xiaodongInfo.uid);
              data.user.should.have.property('username', 'xiaodong');
              done();
            });
            xiaodong.usersChannel.emit('login', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
            });
          });
        });
      });
      can('在用户曾经参与过的location的其他用户收到通知', function(done){
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            wangyu.locationsChannel.on('push-attended-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.should.have.property('user');
              data.user.should.have.property('_id', xiaodongInfo.uid);
              data.user.should.have.property('username', 'xiaodong');
              data.user.should.have.property('status', 'online');
              done();
            });
            xiaodong.usersChannel.emit('login', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
            });
          });
        });
      });
      can('能够加入关注的locations的room中', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          xiaodong.usersChannel.emit('login', {
            token: xiaodongInfo.uid
          }, function(data){
            data.should.have.property('result', 'success');
            xiaodong.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.location.should.have.property('url', '');
              data.should.have.property('user');
              data.user.should.have.property('_id', wangyuInfo.uid);
              data.should.have.property('action', 'join');
              waiter1();
            });
            socketHelper.getClient(wangyuInfo, function(wangyu){
              waiter2();
            });
          });
        });
      });
      can('能够加入到创建的兴趣点的room中', function(done){
        var waiter, waiter1, waiter2, requestCreateANewInterestingPointSession;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        requestCreateANewInterestingPointSession = {
          ipid: 'ipid-1',
          title: 'hahaha'
        };
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixin){
            xiaodong.usersChannel.emit('login', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-session-updated-in-created-interesting-point', function(data){
                waiter1();
              });
              baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
                data.should.have.property('result', 'success');
                waiter2();
              });
            });
          });
        });
      });
      can('能够加入到关注的兴趣点的room中', function(done){
        var waiter, waiter1, waiter2, requestCreateANewInterestingPointSession;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        requestCreateANewInterestingPointSession = {
          ipid: 'ipid-2',
          title: 'hahaha'
        };
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixin){
            xiaodong.usersChannel.emit('login', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-session-updated-in-watching-interesting-point', function(data){
                waiter1();
              });
              baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
                data.should.have.property('result', 'success');
                waiter2();
              });
            });
          });
        });
      });
      can('能够加入到创建的会话中', function(done){
        var waiter, waiter1, waiter2, requestCreateANewComment;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        requestCreateANewComment = {
          ipid: 'ipid-1',
          ipsid: 'ipsid-1',
          type: 'ips-msg',
          originalContentType: 'text',
          textContent: 'asdjfkasdjfk',
          voiceContent: 'kasfjkasdjf',
          isAnonymous: false
        };
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixin){
            xiaodong.usersChannel.emit('login', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-comment-updated-in-created-session', function(data){
                waiter1();
              });
              baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
                data.should.have.property('result', 'success');
                waiter2();
              });
            });
          });
        });
      });
      can('能够加入到关注的会话中', function(done){
        var waiter, waiter1, waiter2, requestCreateANewComment;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        requestCreateANewComment = {
          ipid: 'ipid-2',
          ipsid: 'ipsid-2',
          type: 'ips-msg',
          originalContentType: 'text',
          textContent: 'asdjfkasdjfk',
          voiceContent: 'kasfjkasdjf',
          isAnonymous: false
        };
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixin){
            xiaodong.usersChannel.emit('login', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-comment-updated-in-watching-session', function(data){
                waiter1();
              });
              baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
                data.should.have.property('result', 'success');
                waiter2();
              });
            });
          });
        });
      });
      can('能够加入到创建的评论中', function(done){
        var waiter, waiter1, waiter2, requestCreateANewReply;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        requestCreateANewReply = {
          ipid: 'ipid-2',
          ipsid: 'ipsid-2',
          rMid: 'cid-1',
          type: 'ip-rpl',
          originalContentType: 'text',
          textContent: 'asdjfkasdjfk',
          voiceContent: 'kasfjkasdjf',
          isAnonymous: false
        };
        socketHelper.getClient({
          loggedIn: false
        }, function(xiaodong){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixin){
            xiaodong.usersChannel.emit('login', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-reply-updated-in-created-comment', function(data){
                waiter1();
              });
              baixin.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
                data.should.have.property('result', 'success');
                waiter2();
              });
            });
          });
        });
      });
    });
  });
}).call(this);
