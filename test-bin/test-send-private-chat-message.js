(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//send-private-chat-message/fixture/';
  describe('unit/ test -- send-private-chat-message', function(){
    var xiaodong, baixin, wangyu, weike, privateChatMessage, privateChatMessageAtUsers;
    xiaodong = baixin = wangyu = weike = null;
    privateChatMessage = {
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '召唤 Shin 赶紧出现！！',
      voiceContent: '/voice-message/cid-1/xxxx'
    };
    privateChatMessageAtUsers = {
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '召唤@wangyu @weike 赶紧出现！！',
      voiceContent: '/voice-message/cid-1/xxxx'
    };
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//send-private-chat-message', ['users', 'chats'], done);
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
        loggedIn: false,
        urls: ['http://www.some.com']
      };
      can('小东发送私聊信息，返回错误结果', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('小东已登录', function(){
      beforeEach(function(done){
        var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo;
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
        wangyuInfo = {
          uid: 'uid-3',
          loggedIn: true,
          urls: ['http://www.some.com']
        };
        weikeInfo = {
          uid: 'uid-4',
          loggedIn: true,
          urls: ['http://www.some.com']
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannels){
          socketHelper.getClient(baixinInfo, function(baixinChannels){
            socketHelper.getClient(wangyuInfo, function(wangyuChannels){
              socketHelper.getClient(weikeInfo, function(weikeChannels){
                xiaodong = xiaodongChannels;
                baixin = baixinChannels;
                wangyu = wangyuChannels;
                weike = weikeChannels;
                done();
              });
            });
          });
        });
      });
      can('小东发送私聊信息， 返回正确结果', function(done){
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('newChatMessage');
          data.newChatMessage.should.have.property('_id');
          data.newChatMessage.should.have.property('type');
          data.should.not.have.property('pushType');
          data.should.not.have.property('chatType');
          data.newChatMessage.should.have.property('cid');
          data.newChatMessage.should.have.property('originalContentType');
          data.newChatMessage.should.have.property('textContent');
          data.newChatMessage.should.have.property('voiceContent');
          data.newChatMessage.should.have.property('createTime');
          data.newChatMessage.should.have.property('sendByMe', true);
          data.newChatMessage.should.not.have.property('sendBy');
          done();
        });
      });
      can('柏信发送私聊信息， 返回正确结果', function(done){
        baixin.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('newChatMessage');
          data.newChatMessage.should.have.property('_id');
          data.newChatMessage.should.have.property('type');
          data.should.not.have.property('pushType');
          data.should.not.have.property('chatType');
          data.newChatMessage.should.have.property('cid');
          data.newChatMessage.should.have.property('originalContentType');
          data.newChatMessage.should.have.property('textContent');
          data.newChatMessage.should.have.property('voiceContent');
          data.newChatMessage.should.have.property('createTime');
          data.newChatMessage.should.have.property('sendByMe', true);
          data.newChatMessage.should.not.have.property('sendBy');
          done();
        });
      });
      can('小东发送私聊信息，柏信收到消息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.chatsChannel.on('push-new-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('type');
          data.should.have.property('pushType', 'personal-msg');
          data.should.have.property('chatType', 'private-chat');
          data.should.have.property('cid');
          data.should.have.property('originalContentType');
          data.should.have.property('textContent');
          data.should.have.property('voiceContent');
          data.should.have.property('createTime');
          data.should.have.property('sendByMe', false);
          data.should.have.property('sendBy');
          data.sendBy.should.have.property('_id');
          data.sendBy.should.have.property('username');
          data.sendBy.should.have.property('gender');
          data.sendBy.should.have.property('email');
          data.sendBy.should.have.property('signature');
          data.sendBy.should.have.property('avatar');
          waiter1();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          waiter2();
        });
      });
      can('柏信发送私聊信息， 小东能收到消息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.chatsChannel.on('push-new-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('type');
          data.should.have.property('pushType', 'personal-msg');
          data.should.have.property('chatType', 'private-chat');
          data.should.have.property('cid');
          data.should.have.property('originalContentType');
          data.should.have.property('textContent');
          data.should.have.property('voiceContent');
          data.should.have.property('createTime');
          data.should.have.property('sendByMe', false);
          data.should.have.property('sendBy');
          data.sendBy.should.have.property('_id');
          data.sendBy.should.have.property('username');
          data.sendBy.should.have.property('gender');
          data.sendBy.should.have.property('email');
          data.sendBy.should.have.property('signature');
          data.sendBy.should.have.property('avatar');
          waiter1();
        });
        baixin.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          waiter2();
        });
      });
      can('小东给柏信发送私聊， @了王瑜和伟可， 收到新建群聊', function(done){
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessageAtUsers, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
      can('小东给柏信发送私聊， @了王瑜和伟可， 王瑜收到邀请系统信息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        wangyu.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('cid');
          data.should.have.property('type');
          data.should.have.property('pushType', 'system-msg');
          data.should.have.property('chatType', 'group-chat');
          data.should.have.property('action', 'invite');
          data.should.have.property('sendBy');
          data.should.have.property('invitedUsers');
          data.should.have.property('textContent');
          data.should.have.property('createTime');
          waiter2();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessageAtUsers, function(data){
          waiter1();
        });
      });
      can('小东给柏信发送私聊， @了王瑜和伟可， 伟可收到邀请系统信息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        weike.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('cid');
          data.should.have.property('type');
          data.should.have.property('pushType', 'system-msg');
          data.should.have.property('chatType', 'group-chat');
          data.should.have.property('action', 'invite');
          data.should.have.property('sendBy');
          data.should.have.property('invitedUsers');
          data.should.have.property('textContent');
          data.should.have.property('createTime');
          waiter2();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessageAtUsers, function(data){
          waiter1();
        });
      });
      can('小东给柏信发送私聊， @了王瑜和伟可， 柏信收到邀请王瑜的系统信息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('cid');
          data.should.have.property('type');
          data.should.have.property('pushType', 'system-msg');
          data.should.have.property('chatType', 'group-chat');
          data.should.have.property('action', 'invite');
          data.should.have.property('sendBy');
          data.should.have.property('invitedUsers');
          data.should.have.property('textContent');
          data.should.have.property('createTime');
          waiter2();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessageAtUsers, function(data){
          waiter1();
        });
      });
      can('小东给柏信发送私聊， @了王瑜和伟可， 小东自己也能收到邀请系统消息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        xiaodong.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('cid');
          data.should.have.property('type');
          data.should.have.property('pushType', 'system-msg');
          data.should.have.property('chatType', 'group-chat');
          data.should.have.property('action', 'invite');
          data.should.have.property('sendBy');
          data.should.have.property('invitedUsers');
          data.should.have.property('textContent');
          data.should.have.property('createTime');
          waiter2();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', privateChatMessageAtUsers, function(data){
          waiter1();
        });
      });
    });
  });
}).call(this);
