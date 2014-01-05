(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-replies/fixture/';
  describe('unit test -- retrieve-replies', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-replies', ['locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够返回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-replies', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('回复所在的评论不存在时，返回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-replies', {
          cid: 'inexistence-cid'
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('若没有设置last-access-time，能够根据skip, limit, sort返回正确的数据', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-replies', {
          cid: 'mid-1',
          skip: 0,
          limit: 3
        }, function(data){
          var oldestReply, ref$;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('replies');
          data.replies.length.should.below(4);
          oldestReply = (ref$ = data.replies)[ref$.length - 1];
          channels.interestingPointsChannel.emit('retrieve-replies', {
            cid: 'mid-1',
            skip: 0,
            limit: 3,
            sort: 0
          }, function(data){
            var newestReply, ref$;
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('replies');
            data.replies.length.should.below(4);
            newestReply = (ref$ = data.replies)[ref$.length - 1];
            (newestReply.createTime > oldestReply.createTime).should.be['true'];
            done();
          });
        });
      });
    });
    can('若设置了last-access-time，能够根据last-access-time, limit, sort返回正确的数据', function(done){
      var lastAccessTime;
      lastAccessTime = '' + new Date;
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-replies', {
          cid: 'mid-1',
          lastAccessTime: lastAccessTime,
          skip: 10000,
          limit: 3
        }, function(data){
          var randomIndex;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('replies');
          data.replies.length.should.below(4);
          randomIndex = Math.random() * data.replies.length >> 0;
          (data.replies[randomIndex].createTime > JSON.stringify(new Date(lastAccessTime))).should.be['true'];
          done();
        });
      });
    });
    can('若查询内容有匿名回复，该回复的创建者信息会被隐藏', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-replies', {
          cid: 'mid-9',
          skip: 0,
          limit: 1
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('replies')['with'].length(1);
          data.replies[0].isAnonymous.should.be['true'];
          data.replies[0].should.have.property('sendBy');
          data.replies[0].sendBy.username.should.eql('匿名用户');
          data.replies[0].sendBy._id.should.eql('');
          done();
        });
      });
    });
  });
}).call(this);
