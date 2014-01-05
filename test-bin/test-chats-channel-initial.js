(function(){
  var FIXTURE_PATH, initialChatsChannel, mockLoggedInAndSendSidBack, initialClient;
  FIXTURE_PATH = 'unit/chats-channel-initial/fixture/';
  describe('unit test -- chats-channel-initial', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/chats-channel-initial', ['users', 'chats', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('用户已经登录时', function(){
      can('能够返回正确的初始化数据', function(done){
        initialChatsChannel({
          loggedIn: true,
          uid: 'uid-1'
        }, function(chatsChannel, responseData){
          responseData.should.have.property('privateChats');
          responseData.should.have.property('groupChats');
          done();
        });
      });
      can('能够加入到正确的room中', function(done){
        done();
      });
    });
    describe('用户未登录时', function(){
      can('能够返回正确的初始化数据', function(done){
        initialChatsChannel({
          loggedIn: false,
          uid: 'uid-1'
        }, function(chatsChannel, responseData){
          responseData.should.eql({});
          done();
        });
      });
    });
  });
  initialChatsChannel = function(config, callback){
    if (config.loggedIn === true) {
      mockLoggedInAndSendSidBack(config.uid, function(sid){
        initialClient(sid, callback);
      });
    } else {
      initialClient('', callback);
    }
  };
  mockLoggedInAndSendSidBack = function(uid, callback){
    socketHelper.initialClient({
      testingHelperChannel: {
        options: {
          requestInitialData: {
            uid: uid
          }
        }
      },
      defaultChannel: {}
    }, function(channels, responseDatas){
      channels.defaultChannel.socket.disconnect();
      callback(responseDatas.defaultChannel.sid);
    });
  };
  initialClient = function(sid, callback){
    socketHelper.initialClient({
      defaultChannel: {
        options: {
          requestInitialData: {
            sid: sid
          }
        }
      },
      chatsChannel: {}
    }, function(channels, responseDatas){
      socketHelper.SocketsDestroyer.get().addSocket(channels.defaultChannel);
      callback(channels.chatsChannel, responseDatas.chatsChannel);
    });
  };
}).call(this);
