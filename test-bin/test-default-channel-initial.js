(function(){
  var FIXTURE_PATH, initialDefaultChannelWithoutPassingSid, mockLoggedInAndSendSidBack, initialDefaultChannelWithPassingSid;
  FIXTURE_PATH = 'unit//users-channel-initial/fixture/';
  describe('unit test -- default-channel-initial', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/default-channel-initial', [], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('初始化时没有传递sid，返回默认的session内容', function(done){
      initialDefaultChannelWithoutPassingSid(function(defaultChannel, responseData){
        responseData.should.have.property('sid');
        responseData.should.have.property('session');
        responseData.sid.should.equal(defaultChannel.socket.sessionid);
        responseData.session.should.not.have.property('uid');
        done();
      });
    });
    describe('初始化时传递了sid', function(){
      can('通过sid能够找到session，能够恢复用户数据', function(done){
        mockLoggedInAndSendSidBack(function(sid){
          initialDefaultChannelWithPassingSid(sid, function(defaultChannel, responseData){
            responseData.should.have.property('sid');
            responseData.should.have.property('session');
            responseData.session.should.have.property('uid');
            responseData.session.should.have.property('status');
            responseData.session.uid.should.eql('uid-1');
            responseData.session.status.should.eql('online');
            done();
          });
        });
      });
      can('通过sid无法找到session，返回默认的session内容', function(done){
        initialDefaultChannelWithPassingSid('inexistence-socket-id', function(defaultChannel, responseData){
          responseData.should.have.property('sid');
          responseData.should.have.property('session');
          responseData.sid.should.eql(defaultChannel.socket.sessionid);
          responseData.session.should.not.have.property('uid');
          responseData.session.should.not.have.property('status');
          done();
        });
      });
    });
  });
  initialDefaultChannelWithoutPassingSid = function(callback){
    socketHelper.initialClient({
      defaultChannel: {}
    }, function(channels, responseDatas){
      socketHelper.SocketsDestroyer.get().addSocket(channels.defaultChannel);
      callback(channels.defaultChannel, responseDatas.defaultChannel);
    });
  };
  mockLoggedInAndSendSidBack = function(callback){
    socketHelper.initialClient({
      defaultChannel: {},
      testingHelperChannel: {
        options: {
          requestInitialData: {
            uid: 'uid-1'
          }
        }
      }
    }, function(channels, responseDatas){
      channels.defaultChannel.socket.disconnect();
      callback(responseDatas.testingHelperChannel.sid);
    });
  };
  initialDefaultChannelWithPassingSid = function(sid, callback){
    socketHelper.initialClient({
      defaultChannel: {
        options: {
          requestInitialData: {
            sid: sid
          }
        }
      }
    }, function(channels, responseDatas){
      socketHelper.SocketsDestroyer.get().addSocket(channels.defaultChannel);
      callback(channels.defaultChannel, responseDatas.defaultChannel);
    });
  };
}).call(this);
