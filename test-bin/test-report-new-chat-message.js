(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//report-new-chat-message/fixture/';
  describe('unit/ test -- report-new-chat-message', function(){
    var xiaodong, baixin, wangyu, privateChatMessage, newChatRoomId;
    xiaodong = baixin = wangyu = null;
    privateChatMessage = {
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '召唤@王瑜 赶紧出现！！',
      voiceContent: '/voice-message/cid-1/xxxx'
    };
    newChatRoomId = '';
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//report-new-chat-message', ['users', 'chats'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('小东在和柏信私聊中发送一条信息, @ 王瑜', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true
          }, function(baixinChannels){
            socketHelper.getClient({
              uid: 'uid-3',
              loggedIn: true
            }, function(wangyuChannels){
              xiaodong = xiaodongChannels;
              baixin = baixinChannels;
              wangyu = wangyuChannels;
              done();
            });
          });
        });
      });
      can('柏信收到消息提示', function(done){
        var waiter, waiter1, waiter2, waiter3;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        xiaodong.chatsChannel.on('push-new-chat-message', function(data){
          data.should.fail('小东不能收到推送信息');
        });
        baixin.chatsChannel.on('push-new-chat-message', function(data){
          data.should.have.property('sendByMe', false);
          data.should.have.property('cid', 'cid-1');
          data.sendBy.should.have.property('_id', 'uid-1');
          waiter3();
        });
        baixin.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('type', 'chat-msg');
          data.should.have.property('action', 'invite');
          waiter2();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          waiter1();
        });
      });
      can('王瑜收到消息提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        wangyu.chatsChannel.on('push-new-chat-message', function(data){
          data.should.fail('王玉不能收到这个消息');
        });
        wangyu.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('type', 'chat-msg');
          data.should.have.property('action', 'invite');
          waiter1();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          waiter2();
        });
      });
    });
    describe('report时， 传递错误的cid, 系统提示错误', function(){
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
            xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
              done();
            });
          });
        });
      });
      can('柏信report时，cid错误， 服务器返回错误信息', function(done){
        baixin.chatsChannel.emit('report-new-chat-message', {
          cid: 'error-cid',
          type: 'private-chat'
        }, function(data){
          data.should.have.property('result', 'failed');
          done();
        });
      });
    });
    describe('不 report群聊， 再次登录', function(){
      beforeEach(function(done){
        var cid;
        cid = null;
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['www.some.come']
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-3',
            loggedIn: true,
            urls: ['www.some.come']
          }, function(wangyuChannels){
            xiaodong = xiaodongChannels;
            wangyu = wangyuChannels;
            xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
              wangyu.usersChannel.emit('logout', {
                token: 'uid-3'
              }, function(data){
                done();
              });
            });
          });
        });
      });
      can('王瑜登出, 再次登录, 检查到该聊天室有一条未读消息', function(done){
        wangyu.usersChannel.emit('login', {
          token: 'uid-3'
        }, function(data){
          wangyu.chatsChannel.emit('retrieve-group-chats', {}, function(data){
            var newGroupChat;
            newGroupChat = _.find(data.groupChats, function(chat){
              return chat._id !== 'cid-2';
            });
            newGroupChat.should.have.property('unreadSystemChatMessages')['with'].lengthOf(1);
            done();
          });
        });
      });
    });
    describe('report群聊后， 再次登录', function(){
      beforeEach(function(done){
        var cid;
        cid = null;
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['www.some.com']
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true,
            urls: ['www.some.com']
          }, function(baixinChannels){
            socketHelper.getClient({
              uid: 'uid-3',
              loggedIn: true,
              urls: ['www.some.com']
            }, function(wangyuChannels){
              xiaodong = xiaodongChannels;
              baixin = baixinChannels;
              wangyu = wangyuChannels;
              baixin.chatsChannel.on('push-system-chat-message', function(data){
                cid = data.cid;
              });
              xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                setTimeout(function(){
                  baixin.chatsChannel.emit('report-new-chat-message', {
                    cid: cid,
                    type: 'group-chat'
                  }, function(data){
                    baixin.usersChannel.emit('logout', {
                      token: 'uid-2'
                    }, function(data){
                      done();
                    });
                  });
                }, 500);
              });
            });
          });
        });
      });
      can('柏信report群聊, 登出, 再次登录, 该聊天室中没有未读消息', function(done){
        xiaodong.chatsChannel.on('push-system-chat-message', function(data){
          data.should.fail('小东收到了柏信report的系统消息推送');
        });
        baixin.usersChannel.emit('login', {
          token: 'uid-2'
        }, function(data){
          baixin.chatsChannel.emit('retrieve-group-chats', {}, function(data){
            data.should.have.property('result', 'success');
            data.groupChats[0].should.have.property('unreadSystemChatMessages')['with'].lengthOf(0);
            done();
          });
        });
      });
    });
    describe('被邀请者report群聊后， 其他人收到系统消息推送', function(done){
      var cid;
      cid = null;
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['http://www.some.com']
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true,
            urls: ['http://www.some.com']
          }, function(baixinChannels){
            socketHelper.getClient({
              uid: 'uid-3',
              loggedIn: true,
              urls: ['http://www.some.com']
            }, function(wangyuChannels){
              xiaodong = xiaodongChannels;
              baixin = baixinChannels;
              wangyu = wangyuChannels;
              wangyu.chatsChannel.on('push-system-chat-message', function(data){
                cid = data.cid;
              });
              xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                setTimeout(function(){
                  done();
                }, 200);
              });
            });
          });
        });
      });
      can('王瑜接受邀请', function(done){
        var waiter, waiter1, waiter2, waiter3;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        baixin.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('action', 'accept');
          waiter3();
        });
        xiaodong.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('action', 'accept');
          waiter2();
        });
        wangyu.chatsChannel.emit('report-new-chat-message', {
          cid: cid,
          type: 'group-chat'
        }, function(data){
          waiter1();
        });
      });
    });
    describe('report群聊后， 再次登录', function(){
      beforeEach(function(done){
        var cid;
        cid = null;
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['www.some.come']
        }, function(xiaodongChannels){
          socketHelper.getClient({
            uid: 'uid-2',
            loggedIn: true,
            urls: ['www.some.come']
          }, function(baixinChannels){
            socketHelper.getClient({
              uid: 'uid-3',
              loggedIn: true,
              urls: ['www.some.come']
            }, function(wangyuChannels){
              xiaodong = xiaodongChannels;
              baixin = baixinChannels;
              wangyu = wangyuChannels;
              wangyu.chatsChannel.on('push-system-chat-message', function(data){
                cid = data.cid;
              });
              xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                setTimeout(function(){
                  wangyu.chatsChannel.emit('report-new-chat-message', {
                    cid: cid,
                    type: 'group-chat'
                  }, function(data){
                    wangyu.usersChannel.emit('logout', {
                      token: 'uid-3'
                    }, function(data){
                      done();
                    });
                  });
                }, 300);
              });
            });
          });
        });
      });
      can('王瑜report, 登出, 再次登录, 该聊天室没有未读消息', function(done){
        wangyu.usersChannel.emit('login', {
          token: 'uid-3'
        }, function(data){
          wangyu.chatsChannel.emit('retrieve-group-chats', {}, function(data){
            data.should.have.property('result', 'success');
            data.groupChats[0].should.have.property('unreadUserChatMessagesCount', 0);
            done();
          });
        });
      });
    });
  });
}).call(this);
