(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//update-chat-room-signature/fixture/';
  describe('unit/ test -- update-chat-room-signature', function(){
    var xiaodong, baixin;
    xiaodong = baixin = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//update-chat-room-signature', ['users', 'chats'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('晓东更改群聊天室的签名', function(){
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
      can('晓东更改签名， 收到服务器响应', function(done){
        xiaodong.chatsChannel.emit('update-chat-room-signature', {
          cid: 'cid-1',
          signature: '这是一个新的签名'
        }, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
      can('晓东更改签名，晓东收到push信息', function(done){
        var waiter, waiter1;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        xiaodong.chatsChannel.on('push-new-chat-room-signature', function(data){
          data.should.fail('修改者收到了修改信息');
        });
        xiaodong.chatsChannel.emit('update-chat-room-signature', {
          cid: 'cid-1',
          signature: '这是一个新的签名'
        }, function(data){
          waiter1();
        });
      });
      can('晓东更改签名，柏信收到push信息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.chatsChannel.on('push-new-chat-room-signature', function(data){
          data.should.have.property('cid', 'cid-1');
          data.updateUser.should.have.property('_id', 'uid-1');
          waiter1();
        });
        xiaodong.chatsChannel.emit('update-chat-room-signature', {
          cid: 'cid-1',
          signature: '这是一个新的签名'
        }, function(data){
          waiter2();
        });
      });
    });
  });
}).call(this);
