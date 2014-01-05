(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//update-chat-room-name/fixture/';
  describe('unit/ test -- update-chat-room-name', function(){
    var xiaodong, baixin, wangyu;
    xiaodong = baixin = wangyu = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//update-chat-room-name', ['users', 'chats'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('小东更改群聊天室cid-2的名称', function(){
      beforeEach(function(done){
        return socketHelper.getClient({
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
      can('小东更改聊天室，收到服务器响应', function(done){
        xiaodong.chatsChannel.emit('update-chat-room-name', {
          cid: 'cid-2',
          name: '我是王瑜'
        }, function(data){
          data.should.have.property('result', 'success');
          done();
        });
      });
      can('小东更改聊天室名称，小东收到push-new-chat-room-name', function(done){
        var waiter, waiter1;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        xiaodong.chatsChannel.on('push-new-chat-room-name', function(data){
          data.should.fail('修改者收到了修改信息');
        });
        xiaodong.chatsChannel.emit('update-chat-room-name', {
          cid: 'cid-2',
          name: '我是王瑜'
        }, function(data){
          waiter1();
        });
      });
      can('小东更改聊天室名称，柏信收到push-new-chat-room-name', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.chatsChannel.on('push-new-chat-room-name', function(data){
          data.should.have.property('cid', 'cid-2');
          data.should.have.property('name', '我是王瑜');
          data.updateUser.should.have.property('_id', 'uid-1');
          waiter2();
        });
        xiaodong.chatsChannel.emit('update-chat-room-name', {
          cid: 'cid-2',
          name: '我是王瑜'
        }, function(data){
          waiter1();
        });
      });
      can('小东更改聊天室名称， 王瑜收到push-new-chat-room-name', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        wangyu.chatsChannel.on('push-new-chat-room-name', function(data){
          data.should.have.property('cid', 'cid-2');
          data.should.have.property('name', '我是王瑜');
          data.updateUser.should.have.property('_id', 'uid-1');
          waiter2();
        });
        xiaodong.chatsChannel.emit('update-chat-room-name', {
          cid: 'cid-2',
          name: '我是王瑜'
        }, function(data){
          waiter1();
        });
      });
    });
  });
}).call(this);
