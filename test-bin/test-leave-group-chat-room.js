(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//leave-group-chat-room/fixture/';
  describe('unit/ test -- leave-group-chat-room', function(){
    var xiaodong, baixin, wangyu;
    xiaodong = baixin = wangyu = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//leave-group-chat-room', ['users', 'chats'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('王瑜拒绝接受小东的邀请 -- 离开cid-1', function(){
      beforeEach(function(done){
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
              baixin.chatsChannel.on('push-system-chat-message', function(data){});
              xiaodong.chatsChannel.emit('send-group-chat-message', {
                cid: 'cid-1',
                originalContentType: 'text',
                voiceContent: '',
                textContent: '@王瑜 快点出现吧'
              }, function(data){
                done();
              });
            });
          });
        });
      });
      can('王瑜登录，retrieve-group-chats返回数据中群聊天室有数据', function(done){
        wangyu.usersChannel.emit('logout', {
          token: 'uid-3'
        }, function(data){
          wangyu.usersChannel.emit('login', {
            token: 'uid-3'
          }, function(data){
            wangyu.chatsChannel.emit('retrieve-group-chats', {}, function(data){
              data.groupChats[0].should.have.property('unreadSystemChatMessages')['with'].length(1);
              done();
            });
          });
        });
      });
      can('王瑜拒绝邀请， 离开cid-1, 收到服务器返回结果', function(done){
        wangyu.chatsChannel.emit('leave-group-chat-room', {
          cid: 'cid-1'
        }, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
      can('王瑜拒绝聊天室cid的邀请后， 登出， 再登录， chats-channel-restored 的返回数据中没有该聊天室', function(done){
        wangyu.chatsChannel.emit('leave-group-chat-room', {
          cid: 'cid-1'
        }, function(data){
          wangyu.usersChannel.emit('logout', {
            token: 'uid-3'
          }, function(data){
            wangyu.usersChannel.emit('login', {
              token: 'uid-3'
            }, function(data){
              wangyu.chatsChannel.emit('retrieve-group-chats', {}, function(data){
                data.should.have.property('result', 'success');
                data.groupChats.should.eql([]);
                done();
              });
            });
          });
        });
      });
      can('王瑜拒绝聊天室cid的邀请后，柏信收到拒绝系统消息提示', function(done){
        var waiter, waiter1, waiter2, waiter3;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        baixin.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('action', 'reject');
          data.should.have.property('type', 'chat-msg');
          waiter2();
        });
        xiaodong.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('action', 'reject');
          data.should.have.property('type', 'chat-msg');
          waiter3();
        });
        wangyu.chatsChannel.emit('leave-group-chat-room', {
          cid: 'cid-1'
        }, function(data){
          waiter1();
        });
      });
    });
    describe('王瑜拒绝后， 柏信离开了该聊天室， cid-1解散， 小东接到系统消息', function(){
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
      can('在群聊天室2 中， 成员只有柏信和小东，柏信离开， 小东收到聊天室解散的系统提示', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('action', 'disband');
          waiter2();
        });
        baixin.chatsChannel.emit('leave-group-chat-room', {
          cid: 'cid-1'
        }, function(data){
          waiter1();
        });
      });
    });
  });
}).call(this);
