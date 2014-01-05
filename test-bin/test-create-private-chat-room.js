(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/create-private-chat-room/fixture/';
  describe('unit test -- create-private-chat-room', function(){
    var privateChatMessage;
    privateChatMessage = {
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '召唤 Shin 赶紧出现！！',
      voiceContent: '/voice-message/cid-1/xxxx'
    };
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/create-private-chat-room', ['users', 'chats'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('用户未登录', function(){
      var xiaodongInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: false,
        urls: ['http://www.baidu.com']
      };
      can('用户创建私聊， 返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('create-private-chat-room', {
            uid: 'uid-2'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('用户已登录', function(){
      var xiaodongInfo, baixinInfo, wangyuInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['http://www.baidu.com']
      };
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true,
        urls: ['http://www.baidu.com']
      };
      wangyuInfo = {
        uid: 'uid-3',
        loggedIn: true,
        urls: ['http://www.baidu.com']
      };
      can('小东和已经聊过天的柏信聊天', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            baixin.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
              setTimeout(function(){
                xiaodong.chatsChannel.emit('create-private-chat-room', {
                  uid: 'uid-2'
                }, function(data){
                  data.should.have.property('result', 'success');
                  data.should.have.property('chatRoom');
                  data.chatRoom.should.have.property('_id');
                  data.chatRoom.should.have.property('type');
                  data.chatRoom.should.have.property('joins');
                  data.chatRoom.should.have.property('unreadUserChatMessages');
                  data.chatRoom.joins[0].should.have.property('_id');
                  data.chatRoom.joins[0].should.have.property('username');
                  data.chatRoom.joins[0].should.have.property('email');
                  data.chatRoom.joins[0].should.have.property('gender');
                  data.chatRoom.joins[0].should.have.property('avatar');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('_id');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('type');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('cid');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('originalContentType');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('textContent');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('voiceContent');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('createTime');
                  data.chatRoom.unreadUserChatMessages[0].should.have.property('sendBy');
                  data.chatRoom.unreadUserChatMessages[0].sendBy.should.have.property('_id');
                  data.chatRoom.unreadUserChatMessages[0].sendBy.should.have.property('username');
                  data.chatRoom.unreadUserChatMessages[0].sendBy.should.have.property('gender');
                  data.chatRoom.unreadUserChatMessages[0].sendBy.should.have.property('email');
                  data.chatRoom.unreadUserChatMessages[0].sendBy.should.have.property('signature');
                  data.chatRoom.unreadUserChatMessages[0].sendBy.should.have.property('avatar');
                  done();
                });
              }, 500);
            });
          });
        });
      });
      can('小东和已经聊过天的柏信发起聊天并发送信息， 收到系统正确响应', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-2'
            }, function(data){
              xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                data.should.have.property('result', 'success');
                done();
              });
            });
          });
        });
      });
      can('小东和已经聊过天的柏信发起聊天并发送信息， 柏信能够收到信息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            baixin.chatsChannel.on('push-new-chat-message', function(data){
              data.should.have.property('cid', 'cid-1');
              waiter1();
            });
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-2'
            }, function(data){
              xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                waiter2();
              });
            });
          });
        });
      });
      can('小东向柏信发起聊天，之后， 柏信向小东发起聊天， 小东发送信息， 柏信收到', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            baixin.chatsChannel.on('push-new-chat-message', function(data){
              data.should.have.property('cid', 'cid-1');
              waiter1();
            });
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-2'
            }, function(data){
              baixin.chatsChannel.emit('create-private-chat-room', {
                uid: 'uid-1'
              }, function(data){
                xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                  waiter2();
                });
              });
            });
          });
        });
      });
      can('小东向柏信发起聊天，之后， 柏信向小东发起聊天， 柏信发送信息， 小东收到', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(baixinInfo, function(baixin){
            xiaodong.chatsChannel.on('push-new-chat-message', function(data){
              data.should.have.property('cid', 'cid-1');
              waiter1();
            });
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-2'
            }, function(data){
              baixin.chatsChannel.emit('create-private-chat-room', {
                uid: 'uid-1'
              }, function(data){
                baixin.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                  waiter2();
                });
              });
            });
          });
        });
      });
      can('小东和未曾聊过天的王瑜聊天', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('create-private-chat-room', {
            uid: 'uid-3'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('chatRoom');
            data.chatRoom.should.have.property('_id');
            data.chatRoom.should.have.property('type');
            data.chatRoom.should.have.property('joins');
            data.chatRoom.should.have.property('unreadUserChatMessages');
            data.chatRoom.joins[0].should.have.property('_id');
            data.chatRoom.joins[0].should.have.property('username');
            data.chatRoom.joins[0].should.have.property('email');
            data.chatRoom.joins[0].should.have.property('gender');
            data.chatRoom.joins[0].should.have.property('avatar');
            done();
          });
        });
      });
      can('小东向王瑜发起聊天， 并发送信息， 收到系统正确响应', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-3'
            }, function(data){
              xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
                data.should.have.property('result', 'success');
                done();
              });
            });
          });
        });
      });
      can('小东向王瑜发起聊天， 并发送信息，王瑜收到信息', function(done){
        var waiter, waiter1, waiter2, cid;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        cid = null;
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            wangyu.chatsChannel.on('push-new-chat-message', function(data){
              data.should.have.property('cid');
              waiter1();
            });
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-3'
            }, function(data){
              cid = data.chatRoom._id;
              xiaodong.chatsChannel.emit('send-private-chat-message', {
                cid: cid,
                originalContentType: 'text',
                textContent: '召唤 Shin 赶紧出现！！',
                voiceContent: '/voice-message/cid-1/xxxx'
              }, function(data){
                waiter2();
              });
            });
          });
        });
      });
      can('小东向王瑜发起聊天， 之后， 王瑜向小东发起聊天， 小东发送信息，王瑜收到', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            var cid;
            cid = '';
            wangyu.chatsChannel.on('push-new-chat-message', function(data){
              data.should.have.property('cid');
              waiter1();
            });
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-3'
            }, function(data){
              wangyu.chatsChannel.emit('create-private-chat-room', {
                uid: 'uid-1'
              }, function(data){
                cid = data.chatRoom._id;
                xiaodong.chatsChannel.emit('send-private-chat-message', {
                  cid: cid,
                  originalContentType: 'text',
                  textContent: '召唤 Shin 赶紧出现！！',
                  voiceContent: '/voice-message/cid-1/xxxx'
                }, function(data){
                  waiter2();
                });
              });
            });
          });
        });
      });
      can('小东向王瑜发起聊天， 之后，王瑜向小东发起聊天， 王瑜发送信息， 小东收到', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          socketHelper.getClient(wangyuInfo, function(wangyu){
            var cid;
            cid = '';
            xiaodong.chatsChannel.on('push-new-chat-message', function(data){
              data.should.have.property('cid');
              waiter1();
            });
            xiaodong.chatsChannel.emit('create-private-chat-room', {
              uid: 'uid-3'
            }, function(data){
              wangyu.chatsChannel.emit('create-private-chat-room', {
                uid: 'uid-1'
              }, function(data){
                cid = data.chatRoom._id;
                wangyu.chatsChannel.emit('send-private-chat-message', {
                  cid: cid,
                  originalContentType: 'text',
                  textContent: '召唤 Shin 赶紧出现！！',
                  voiceContent: '/voice-message/cid-1/xxxx'
                }, function(data){
                  waiter2();
                });
              });
            });
          });
        });
      });
      can('小东和自己聊天， 返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('create-private-chat-room', {
            uid: 'uid-1'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
  });
}).call(this);
