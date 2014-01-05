(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/chat/fixture/';
  describe('integrated/ test -- chat', function(){
    var xiaodong, baixin, wangyu, weike, cidXiaodong, cidWangyu;
    xiaodong = baixin = wangyu = weike = null;
    cidXiaodong = cidWangyu = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/chat', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('聊天集成测试', function(){
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
              socketHelper.getClient({
                uid: 'uid-4',
                loggedIn: true
              }, function(weikeChannels){
                var requestDataXiaodong, requestDataWangyu;
                xiaodong = xiaodongChannels;
                baixin = baixinChannels;
                wangyu = wangyuChannels;
                weike = weikeChannels;
                requestDataXiaodong = {
                  uid: 'uid-2'
                };
                requestDataWangyu = {
                  uid: 'uid-4'
                };
                xiaodong.chatsChannel.emit('create-private-chat-room', requestDataXiaodong, function(data){
                  cidXiaodong = data.chatRoom._id;
                  wangyu.chatsChannel.emit('create-private-chat-room', requestDataWangyu, function(data){
                    cidWangyu = data.chatRoom._id;
                    done();
                  });
                });
              });
            });
          });
        });
      });
      can('小东向柏信发起聊天， 两人互相发信息, 王瑜向伟科发起聊天， 两人互相发信息', function(done){
        var waiter, waiter1, waiter2, waiter3, waiter4, messageXiaodong, messageWangyu;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        waiter3 = waiter.addWaitingFunction();
        waiter4 = waiter.addWaitingFunction();
        messageXiaodong = {
          cid: cidXiaodong,
          originalContentType: 'text',
          textContent: 'hello baixin',
          voiceContent: ''
        };
        messageWangyu = {
          cid: cidWangyu,
          originalContentType: 'text',
          textContent: 'hello weike',
          voiceContent: ''
        };
        baixin.chatsChannel.on('push-new-chat-message', function(data){
          data.should.have.property('cid', cidXiaodong);
          waiter4();
        });
        weike.chatsChannel.on('push-new-chat-message', function(data){
          data.should.have.property('cid', cidWangyu);
          waiter3();
        });
        xiaodong.chatsChannel.emit('send-private-chat-message', messageXiaodong, function(data){
          waiter1();
        });
        wangyu.chatsChannel.emit('send-private-chat-message', messageWangyu, function(data){
          waiter2();
        });
      });
    });
  });
}).call(this);
