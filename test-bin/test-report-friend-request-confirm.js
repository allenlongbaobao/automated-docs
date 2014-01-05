(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//report-friend-request-confirm/fixture/';
  describe('unit/ test -- report-friend-request-confirm', function(){
    var xiaodong;
    xiaodong = null;
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//report-friend-request-confirm', ['users'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    describe('对于好友处理未作report时', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: false
        }, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('小东登录时， rejectedFriends中有王瑜', function(done){
        xiaodong.usersChannel.emit('login', {
          token: 'uid-1'
        }, function(data){
          xiaodong.usersChannel.emit('retrieve-rejected-friends', {}, function(data){
            data.should.have.property('rejectedFriends')['with'].lengthOf(1);
            done();
          });
        });
      });
      can('小东登录时， acceptedFriends中有柏信', function(done){
        xiaodong.usersChannel.emit('login', {
          token: 'uid-1'
        }, function(data){
          xiaodong.usersChannel.emit('retrieve-accepted-friends', {}, function(data){
            data.should.have.property('acceptedFriends')['with'].lengthOf(1);
            done();
          });
        });
      });
    });
    describe('对于王瑜的拒绝请求进行report', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['www.some.com']
        }, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('小东收到其向王瑜发送的好友请求没有得到通过的推送, 报告其已收到, 得到服务器正确反应', function(done){
        xiaodong.usersChannel.emit('report-friend-request-confirm', {
          uid: 'uid-3'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.not.have.property('acceptedUser');
          done();
        });
      });
      can('小东报告之后， 退出， 再次登录，rejectedFriends中没有王瑜', function(done){
        xiaodong.usersChannel.emit('report-friend-request-confirm', {
          uid: 'uid-3'
        }, function(data){
          xiaodong.usersChannel.emit('logout', {
            token: 'uid-1'
          }, function(data){
            xiaodong.usersChannel.emit('login', {
              token: 'uid-1'
            }, function(data){
              xiaodong.usersChannel.emit('retrieve-rejected-friends', {}, function(data){
                data.should.have.property('rejectedFriends')['with'].lengthOf(0);
                done();
              });
            });
          });
        });
      });
    });
    describe('对于柏信接受请求进行report', function(){
      beforeEach(function(done){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(xiaodongChannels){
          xiaodong = xiaodongChannels;
          done();
        });
      });
      can('小东收到其向柏信发送的好友请求得到通过的推送, 报告其已收到, 得到服务器正确反应', function(done){
        xiaodong.usersChannel.emit('report-friend-request-confirm', {
          uid: 'uid-2'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('acceptedUser');
          data.acceptedUser.should.have.property('_id');
          data.acceptedUser.should.have.property('username');
          data.acceptedUser.should.have.property('email');
          data.acceptedUser.should.have.property('gender');
          data.acceptedUser.should.have.property('signature');
          data.acceptedUser.should.have.property('avatar');
          data.acceptedUser.should.have.property('status');
          done();
        });
      });
      can('小东报告之后， 退出， 再次登录， accpetedFriends中没有柏信', function(done){
        xiaodong.usersChannel.emit('report-friend-request-confirm', {
          uid: 'uid-2'
        }, function(data){
          xiaodong.usersChannel.emit('logout', {
            token: 'uid-1'
          }, function(data){
            xiaodong.usersChannel.emit('login', {
              token: 'uid-1'
            }, function(data){
              xiaodong.usersChannel.emit('retrieve-accepted-friends', {}, function(data){
                data.should.have.property('acceptedFriends')['with'].lengthOf(0);
                done();
              });
            });
          });
        });
      });
    });
  });
}).call(this);
