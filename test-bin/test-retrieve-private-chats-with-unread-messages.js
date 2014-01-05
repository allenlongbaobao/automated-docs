(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//retrieve-private-chats-with-unread-messages/fixture/';
  describe('unit/ test -- retrieve-private-chats-with-unread-messages', function(){
    var privateChatMessage;
    privateChatMessage = {
      cid: 'cid-2',
      originalContentType: 'text',
      textContent: '召唤 Shin 赶紧出现！！',
      voiceContent: '/voice-message/cid-1/xxxx'
    };
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-private-chats-with-unread-messages', ['users', 'chats'], done);
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
        loggedIn: false
      };
      can('小东获取有未读消息的私聊， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('retrieve-private-chats-with-unread-messages', {}, function(data){
            data.should.have.property('result', "failed");
            done();
          });
        });
      });
    });
    describe('小东已登录', function(){
      var xiaodong, baixin, wangyu;
      xiaodong = baixin = wangyu = null;
      beforeEach(function(done){
        var xiaodongInfo, baixinInfo, wangyuInfo;
        xiaodongInfo = {
          uid: 'uid-1',
          loggedIn: true
        };
        baixinInfo = {
          uid: 'uid-2',
          loggedIn: true
        };
        wangyuInfo = {
          uid: 'uid-3',
          loggedIn: true
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannels){
          socketHelper.getClient(baixinInfo, function(baixinChannels){
            socketHelper.getClient(wangyuInfo, function(wangyuChannels){
              xiaodong = xiaodongChannels;
              baixin = baixinChannels;
              wangyu = wangyuChannels;
              done();
            });
          });
        });
      });
      can('小东获取有未读消息的私聊，得到正确响应，私聊数为0', function(done){
        xiaodong.chatsChannel.emit('retrieve-private-chats-with-unread-messages', {}, function(data){
          data.should.have.property('result', "success");
          data.should.have.property('privateChats')['with'].lengthOf(0);
          done();
        });
      });
      can('柏信在cid-2中发送信息， 小东获取有未读信息的私聊， 私聊数为1', function(done){
        baixin.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          setTimeout(function(){
            xiaodong.chatsChannel.emit('retrieve-private-chats-with-unread-messages', {}, function(data){
              data.should.have.property('result', 'success');
              data.should.have.property('privateChats')['with'].lengthOf(1);
              data.privateChats[0].should.have.property('_id');
              data.privateChats[0].should.have.property('type');
              data.privateChats[0].should.have.property('joins')['with'].lengthOf(2);
              data.privateChats[0].should.have.property('unreadUserChatMessages')['with'].lengthOf(1);
              done();
            });
          }, 500);
        });
      });
      can('柏信在cid-2中发送信息， 王瑜在cid-3中发送信息， 小东获取有未读消息的私聊， 私聊数为2', function(done){
        baixin.chatsChannel.emit('send-private-chat-message', privateChatMessage, function(data){
          wangyu.chatsChannel.emit('send-private-chat-message', (privateChatMessage.cid = 'cid-3', privateChatMessage), function(data){
            setTimeout(function(){
              xiaodong.chatsChannel.emit('retrieve-private-chats-with-unread-messages', {}, function(data){
                data.should.have.property('result', 'success');
                data.should.have.property('privateChats')['with'].lengthOf(2);
                data.privateChats[0].should.have.property('_id');
                data.privateChats[0].should.have.property('type');
                data.privateChats[0].should.have.property('joins')['with'].lengthOf(2);
                data.privateChats[0].should.have.property('unreadUserChatMessages')['with'].lengthOf(1);
                data.privateChats[1].should.have.property('unreadUserChatMessages')['with'].lengthOf(1);
                done();
              });
            }, 500);
          });
        });
      });
    });
  });
}).call(this);
