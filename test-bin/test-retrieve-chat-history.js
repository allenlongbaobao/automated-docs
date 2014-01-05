(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//retrieve-chat-history/fixture/';
  describe('unit/ test -- retrieve-chat-history', function(){
    var xiaodong, baixin;
    xiaodong = baixin = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//retrieve-chat-history', ['users', 'chats', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('小东获取与柏信的聊天历史记录', function(){
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
            done();
          });
        });
      });
      can('小东获取三条历史聊天记录', function(done){
        setTimeout(function(){
          var referenceTime;
          referenceTime = new Date().toString();
          xiaodong.chatsChannel.emit('retrieve-chat-history', {
            cid: 'cid-1',
            referenceTime: referenceTime,
            limit: 3
          }, function(data){
            data.should.have.property('result', 'success');
            data.chatMessages.should['with'].length(3);
            data.chatMessages[0].should.have.property('_id');
            data.chatMessages[0].should.have.property('type');
            data.chatMessages[0].should.have.property('cid');
            data.chatMessages[0].should.have.property('atUsers');
            data.chatMessages[0].should.have.property('createTime');
            done();
          });
        }, 1000);
      });
    });
  });
}).call(this);
