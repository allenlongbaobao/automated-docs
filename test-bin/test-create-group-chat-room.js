(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit//create-group-chat-room/fixture/';
  describe('unit/ test -- create-group-chat-room', function(){
    var xiaodong, baixin, wangyu, weike, groupChatSchema;
    xiaodong = baixin = wangyu = weike = null;
    groupChatSchema = {
      initialMembers: ['uid-3'],
      name: '@+ 之家',
      signature: '我们是@+ers'
    };
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit//create-group-chat-room', ['users', 'chats'], done);
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
        urls: ['http://www.baidu.com']
      };
      can('用户创建群聊， 返回错误信息', function(done){
        socketHelper.getClient(xiaodongInfo, function(xiaodong){
          xiaodong.chatsChannel.emit('create-group-chat-room', groupChatSchema, function(data){
            data.should.have.property('result', 'failed');
            done();
          });
        });
      });
    });
    describe('用户已登录', function(){
      beforeEach(function(done){
        var xiaodongInfo, baixinInfo, wangyuInfo, weikeInfo;
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
        wangyuInfo = {
          uid: 'uid-3',
          loggedIn: true,
          urls: ['http://www.some.com']
        };
        weikeInfo = {
          uid: 'uid-4',
          loggedIn: true,
          urls: ['http://www.some.com']
        };
        socketHelper.getClient(xiaodongInfo, function(xiaodongChannels){
          socketHelper.getClient(baixinInfo, function(baixinChannels){
            socketHelper.getClient(wangyuInfo, function(wangyuChannels){
              socketHelper.getClient(weikeInfo, function(weikeChannels){
                xiaodong = xiaodongChannels;
                baixin = baixinChannels;
                wangyu = wangyuChannels;
                weike = weikeChannels;
                done();
              });
            });
          });
        });
      });
      can('小东创建群聊，返回正确信息', function(done){
        xiaodong.chatsChannel.emit('create-group-chat-room', groupChatSchema, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('chatRoom');
          data.chatRoom.should.have.property('_id');
          data.chatRoom.should.have.property('name');
          data.chatRoom.should.have.property('signature');
          data.chatRoom.should.have.property('avatar');
          data.chatRoom.should.have.property('joins');
          data.chatRoom.joins[0].should.have.property('_id');
          data.chatRoom.joins[0].should.have.property('username');
          data.chatRoom.joins[0].should.have.property('gender');
          data.chatRoom.joins[0].should.have.property('email');
          data.chatRoom.joins[0].should.have.property('signature');
          data.chatRoom.joins[0].should.have.property('avatar');
          done();
        });
      });
      can('小东创建群聊， initial-members中的用户和已有的群聊相同， 仍然能够创建成功', function(done){
        xiaodong.chatsChannel.emit('create-group-chat-room', (groupChatSchema.initialMembers = ['uid-2', 'uid-3'], groupChatSchema), function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('chatRoom');
          data.chatRoom.should.have.property('_id');
          data.chatRoom._id.should.not.eql('cid-2');
          data.chatRoom.should.have.property('name');
          data.chatRoom.should.have.property('signature');
          data.chatRoom.should.have.property('avatar');
          data.chatRoom.should.have.property('joins');
          data.chatRoom.joins[0].should.have.property('_id');
          data.chatRoom.joins[0].should.have.property('username');
          data.chatRoom.joins[0].should.have.property('gender');
          data.chatRoom.joins[0].should.have.property('email');
          data.chatRoom.joins[0].should.have.property('signature');
          data.chatRoom.joins[0].should.have.property('avatar');
          done();
        });
      });
      can('小东创建群聊， 邀请了柏信和王瑜， 柏信收到邀请的系统消息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        baixin.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('cid');
          data.should.have.property('type');
          data.should.have.property('action', 'invite');
          data.should.have.property('sendBy');
          data.should.have.property('invitedUsers');
          data.should.have.property('textContent');
          data.should.have.property('createTime');
          waiter2();
        });
        xiaodong.chatsChannel.emit('create-group-chat-room', (groupChatSchema.initialMembers = ['uid-2', 'uid-3'], groupChatSchema), function(data){
          waiter1();
        });
      });
      can('小东创建群聊， 邀请了柏信和王瑜， 王瑜收到邀请的系统消息', function(done){
        var waiter, waiter1, waiter2;
        waiter = new utils.AllDoneWaiter(done);
        waiter1 = waiter.addWaitingFunction();
        waiter2 = waiter.addWaitingFunction();
        wangyu.chatsChannel.on('push-system-chat-message', function(data){
          data.should.have.property('_id');
          data.should.have.property('cid');
          data.should.have.property('type');
          data.should.have.property('action', 'invite');
          data.should.have.property('sendBy');
          data.should.have.property('invitedUsers');
          data.should.have.property('textContent');
          data.should.have.property('createTime');
          waiter2();
        });
        xiaodong.chatsChannel.emit('create-group-chat-room', (groupChatSchema.initialMembers = ['uid-2', 'uid-3'], groupChatSchema), function(data){
          waiter1();
        });
      });
    });
  });
}).call(this);
