(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//retrieve-group-chat-room/fixture/';
  describe('unit/ test -- retrieve-group-chat-room', function(){
    var groupChatMessage;
    groupChatMessage = {
      cid: 'cid-2',
      originalContentType: 'text',
      textContent: '召唤Shin 赶紧出现！！',
      voiceContent: '/voice-message/cid-1/xxxx'
    };
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-group-chat-room', ['users', 'chats'], done);
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
        urls: ['http://www.baidu.com']
      };
      can('用户获取群聊， 返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('retrieve-group-chat-room', {
            cid: 'cid-2'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('小东已登录', function(){
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
      can('小东获取已加入的群聊具体信息，得到正确结果', function(done){
        socketHelper.getClient(baixinInfo, function(baixin){
          baixin.chatsChannel.emit('send-group-chat-message', groupChatMessage, function(data){
            socketHelper.getClient(xiaodongInfo, function(xiaodong){
              xiaodong.chatsChannel.emit('retrieve-group-chat-room', {
                cid: 'cid-2'
              }, function(data){
                data.should.have.property('result', 'success');
                data.should.have.property('chatRoom');
                data.chatRoom.should.have.property('_id');
                data.chatRoom.should.have.property('type');
                data.chatRoom.should.have.property('name');
                data.chatRoom.should.have.property('signature');
                data.chatRoom.should.have.property('avatar');
                data.chatRoom.should.have.property('joins');
                data.chatRoom.should.have.property('unreadUserChatMessages');
                data.chatRoom.joins[0].should.have.property('_id');
                data.chatRoom.joins[0].should.have.property('username');
                data.chatRoom.joins[0].should.have.property('gender');
                data.chatRoom.joins[0].should.have.property('email');
                data.chatRoom.joins[0].should.have.property('signature');
                data.chatRoom.joins[0].should.have.property('avatar');
                data.chatRoom.unreadUserChatMessages[0].should.have.property('_id');
                data.chatRoom.unreadUserChatMessages[0].should.have.property('type');
                data.chatRoom.unreadUserChatMessages[0].should.have.property('cid');
                data.chatRoom.unreadUserChatMessages[0].should.have.property('originalContentType');
                data.chatRoom.unreadUserChatMessages[0].should.have.property('voiceContent');
                data.chatRoom.unreadUserChatMessages[0].should.have.property('atUsers');
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
            });
          });
        });
      });
      can('小东获取未加入的群聊具体信息， 得到出错信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('retrieve-group-chat-room', {
            cid: 'cid-3'
          }, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
  });
}).call(this);
