(function(){
  var FIXTURE_PATH, initialUsersChannel, initialClient, mockLoggedInAndSendSidBack;
  FIXTURE_PATH = 'unit//users-channel-initial/fixture/';
  describe('unit/ test -- users-channel-initial', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//users-channel-initial', ['users', 'circles'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('用户已经登陆时', function(){
      can('能够返回正确的初始化数据', function(done){
        initialUsersChannel({
          loggedIn: true,
          uid: 'uid-1'
        }, function(usersChannel, responseData){
          responseData.should.have.property('_id');
          responseData.should.have.property('username');
          responseData.should.have.property('gender');
          responseData.should.have.property('email');
          responseData.should.have.property('signature');
          responseData.should.have.property('avatar');
          responseData.should.have.property('acceptedFriends');
          responseData.should.have.property('rejectedFriends');
          responseData.should.have.property('pendingFriends');
          responseData.should.have.property('activeFriends');
          responseData.should.have.property('acceptedCircles');
          responseData.should.have.property('rejectedCircles');
          responseData.should.have.property('activeCircles');
          responseData.should.have.property('pendingCircles');
          responseData.should.have.property('invitedCircles');
          done();
        });
      });
      can('加入到正确的room中', function(done){
        initialUsersChannel({
          loggedIn: true,
          uid: 'uid-1'
        }, function(user1){
          user1.on('push-user-presence-updated', function(user){
            user.should.have.property('_id');
            user.should.have.property('username');
            user.should.have.property('email');
            user.should.have.property('gender');
            user.should.have.property('signature');
            user.should.have.property('avatar');
            user.should.have.property('status');
            user._id.should.eql('uid-2');
            user.status.should.eql('online');
            done();
          });
          initialUsersChannel({
            loggedIn: true,
            uid: 'uid-2'
          }, function(){});
        });
      });
    });
    describe('用户未登录时', function(){
      can('返回正确的初始化数据', function(done){
        initialUsersChannel({
          loggedIn: false,
          uid: 'uid-1'
        }, function(usersChannel, responseData){
          responseData.should.eql({});
          done();
        });
      });
    });
  });
  initialUsersChannel = function(config, callback){
    if (config.loggedIn === true) {
      mockLoggedInAndSendSidBack(config.uid, function(sid){
        initialClient(sid, callback);
      });
    } else {
      initialClient('', callback);
    }
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
      usersChannel: {}
    }, function(channels, responseDatas){
      socketHelper.SocketsDestroyer.get().addSocket(channels.defaultChannel);
      callback(channels.usersChannel, responseDatas.usersChannel);
    });
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
}).call(this);
