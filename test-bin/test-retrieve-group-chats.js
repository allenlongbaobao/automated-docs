(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//retrieve-group-chats/fixture/';
  describe('unit/ test -- retrieve-group-chats', function(){
    var groupChatMessage;
    groupChatMessage = {
      cid: 'cid-2',
      originalContentType: 'text',
      textContent: '召唤@wangyu 赶紧出现！！',
      voiceContent: '/voice-message/cid-1/xxxx'
    };
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-group-chats', ['users', 'chats'], done);
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
        urls: ['www.some.com']
      };
      can('用户获取群聊信息， 返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('retrieve-group-chats', {}, function(result){
            result.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('用户已登录', function(){
      var xiaodongInfo, baixinInfo;
      xiaodongInfo = {
        uid: 'uid-1',
        loggedIn: true,
        urls: ['www.some.com']
      };
      baixinInfo = {
        uid: 'uid-2',
        loggedIn: true,
        urls: ['http://www.some.com']
      };
      can('用户获取群聊信息， 返回正确信息', function(done){
        socketHelper.getClient(baixinInfo, function(baixin){
          baixin.chatsChannel.emit('send-group-chat-message', groupChatMessage, function(data){
            socketHelper.getClient(xiaodongInfo, function(xiaodong){
              xiaodong.chatsChannel.emit('retrieve-group-chats', {}, function(result){
                result.should.have.property('result', 'success');
                result.should.have.property('groupChats');
                result.groupChats[0].should.have.property('_id');
                result.groupChats[0].should.have.property('type', 'group-chat');
                result.groupChats[0].should.have.property('name');
                result.groupChats[0].should.have.property('signature');
                result.groupChats[0].should.have.property('avatar');
                result.groupChats[0].should.have.property('joins');
                result.groupChats[0].should.have.property('leaves');
                result.groupChats[0].should.have.property('unreadUserChatMessagesCount');
                result.groupChats[0].should.have.property('unreadSystemChatMessages');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('_id');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('cid');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('type');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('action');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('textContent');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('createTime');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('sendBy');
                result.groupChats[0].unreadSystemChatMessages[0].should.have.property('invitedUsers');
                result.groupChats[0].unreadSystemChatMessages[0].sendBy.should.have.property('_id');
                result.groupChats[0].unreadSystemChatMessages[0].sendBy.should.have.property('username');
                result.groupChats[0].unreadSystemChatMessages[0].sendBy.should.have.property('gender');
                result.groupChats[0].unreadSystemChatMessages[0].sendBy.should.have.property('email');
                result.groupChats[0].unreadSystemChatMessages[0].sendBy.should.have.property('signature');
                result.groupChats[0].unreadSystemChatMessages[0].sendBy.should.have.property('avatar');
                done();
              });
            });
          });
        });
      });
    });
  });
}).call(this);
