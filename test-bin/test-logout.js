(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/logout/fixture/';
  describe('unit test -- logout', function(){
    var xiaodong, baixin, wangyu;
    xiaodong = baixin = wangyu = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/logout', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1'
      }, function(client){
        client.usersChannel.emit('logout', {
          thisPropertyCannotAppearHere: true
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('用户未登录时，仍然能够正常退出', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(client){
        client.usersChannel.emit('logout', {
          token: 'this token does not affect when user is logout.'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    describe('正常退出时', function(){
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
      can('用户能够收到退出成功提示', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('logout', {
            token: xiaodongInfo.uid
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            done();
          });
        });
      });
      can('能够正确退出好友的rooms', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.on('push-user-presence-updated', function(data){
            data.fail('退出用户收到了好友的上线通知');
          });
          xiaodong.usersChannel.emit('logout', {
            token: xiaodongInfo.uid
          }, function(data){
            socketHelper.getClient(baixinInfo, function(baixin){
              setTimeout(function(){
                done();
              }, 100);
            });
          });
        });
      });
      can('能够通知好友用户已经退出登录', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(baixinInfo, function(baixin){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            socketHelper.getClient(xiaodongInfo, function(xiaodong){
              baixin.usersChannel.on('push-user-presence-updated', function(data){
                data.should.have.property('_id', xiaodongInfo.uid);
                data.should.have.property('username', 'xiaodong');
                data.should.have.property('status', 'offline');
                waiter1();
              });
              wangyu.usersChannel.on('push-user-presence-updated', function(data){
                data.fail('非好友收到了用户的下线通知');
              });
              xiaodong.usersChannel.emit('logout', {
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
      can('用户无法进行任何需要登录权限才能执行的操作', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('logout', {
            token: xiaodongInfo.uid
          }, function(data){
            data.should.have.property('result', 'success');
            xiaodong.interestingPointsChannel.emit('like-it', {
              type: 'interesting-point',
              id: 'ipid-1'
            }, function(data){
              data.should.have.property('result', 'failed');
              data.should.have.property('errors');
              data.errors.should.includeEql({
                message: '事件like-it需要登录才能完成'
              });
              xiaodong.usersChannel.emit('send-friend-request', {
                uid: 'uid-1'
              }, function(data){
                data.should.have.property('result', 'failed');
                data.should.have.property('errors');
                data.errors.should.includeEql({
                  message: '事件send-friend-request需要登录才能完成'
                });
                done();
              });
            });
          });
        });
      });
      can('在同一个location的其他用户收到通知', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            wangyu.locationsChannel.on('push-active-user-updated', function(data){
              data.should.have.property('action', 'leave');
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.should.have.property('user');
              data.user.should.have.property('_id', xiaodongInfo.uid);
              data.user.should.have.property('username', 'xiaodong');
              done();
            });
            xiaodong.usersChannel.emit('logout', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
            });
          });
        });
      });
      can('在用户参与过的location的其他用户收到通知', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            wangyu.locationsChannel.on('push-attended-user-updated', function(data){
              data.should.have.property('location');
              data.location.should.have.property('id', 'lid-1');
              data.should.have.property('user');
              data.user.should.have.property('_id', xiaodongInfo.uid);
              data.user.should.have.property('username', 'xiaodong');
              data.user.should.have.property('status', 'offline');
              done();
            });
            xiaodong.usersChannel.emit('logout', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
            });
          });
        });
      });
      can('能够离开关注的location的room', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.usersChannel.emit('logout', {
            token: xiaodongInfo.uid
          }, function(data){
            data.should.have.property('result', 'success');
            xiaodong.usersChannel.on('push-active-user-updated', function(data){
              data.should.fail('退出登录后，收到了关注的location的用户更新消息');
            });
            socketHelper.getClient({
              loggedIn: true,
              uid: 'uid-1',
              urls: ['http://www.baidu.com']
            }, function(baixin){
              setTimeout(function(){
                done();
              }, 100);
            });
          });
        });
      });
      can('能够离开创建的兴趣点的room', function(done){
        var requestCreateANewInterestingPointSession;
        requestCreateANewInterestingPointSession = {
          ipid: 'ipid-1',
          title: 'kasdjkasdjfkj'
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            xiaodong.usersChannel.emit('logout', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-session-updated-in-created-interesting-point', function(data){
                data.fail('退出登录后，仍然收到了创建的兴趣点的更新消息');
              });
              baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
                setTimeout(function(){
                  data.should.have.property('result', 'success');
                  done();
                }, 100);
              });
            });
          });
        });
      });
      can('能够离开关注的兴趣点的room', function(done){
        var requestCreateANewInterestingPointSession;
        requestCreateANewInterestingPointSession = {
          ipid: 'ipid-1',
          title: 'kasdjkasdjfkj'
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            xiaodong.usersChannel.emit('logout', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-session-updated-in-watching-interesting-point', function(data){
                data.fail('退出登录后，仍然收到了关注的兴趣点的更新消息');
              });
              baixin.interestingPointsChannel.emit('create-a-new-interesting-point-session', requestCreateANewInterestingPointSession, function(data){
                setTimeout(function(){
                  data.should.have.property('result', 'success');
                  done();
                }, 100);
              });
            });
          });
        });
      });
      can('能够离开创建的会话的room', function(done){
        var requestCreateANewComment;
        requestCreateANewComment = {
          ipid: 'ipid-1',
          ipsid: 'ipsid-1',
          type: 'ips-msg',
          originalContentType: 'text',
          textContent: 'kasfjkas',
          voiceContent: 'askdfj',
          isAnonymous: false
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            xiaodong.usersChannel.emit('logout', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-comment-updated-in-created-session', function(data){
                data.fail('退出登录后，仍然收到了创建的兴趣点会话的更新消息');
              });
              baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
                setTimeout(function(){
                  data.should.have.property('result', 'success');
                  done();
                }, 100);
              });
            });
          });
        });
      });
      can('能够离开关注的会话的room', function(done){
        var requestCreateANewComment;
        requestCreateANewComment = {
          ipid: 'ipid-2',
          ipsid: 'ipsid-2',
          type: 'ips-msg',
          originalContentType: 'text',
          textContent: 'kasfjkas',
          voiceContent: 'askdfj',
          isAnonymous: false
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            xiaodong.usersChannel.emit('logout', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-comment-updated-in-watching-session', function(data){
                data.fail('退出登录后，仍然收到了关注的兴趣点会话的更新消息');
              });
              baixin.interestingPointsChannel.emit('create-a-new-comment', requestCreateANewComment, function(data){
                setTimeout(function(){
                  data.should.have.property('result', 'success');
                  done();
                }, 100);
              });
            });
          });
        });
      });
      can('能够离开创建的评论的room', function(done){
        var requestCreateANewReply;
        requestCreateANewReply = {
          ipid: 'ipid-2',
          ipsid: 'ipsid-2',
          rMid: 'cid-1',
          type: 'ip-rpl',
          originalContentType: 'text',
          textContent: 'kasfjkas',
          voiceContent: 'askdfj',
          isAnonymous: false
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            xiaodong.usersChannel.emit('logout', {
              token: xiaodongInfo.uid
            }, function(data){
              data.should.have.property('result', 'success');
              xiaodong.interestingPointsChannel.on('push-reply-updated-in-created-comment', function(data){
                data.fail('退出登录后，仍然收到了创建的评论的更新消息');
              });
              baixin.interestingPointsChannel.emit('create-a-new-reply', requestCreateANewReply, function(data){
                setTimeout(function(){
                  data.should.have.property('result', 'success');
                  done();
                }, 100);
              });
            });
          });
        });
      });
    });
  });
}).call(this);
