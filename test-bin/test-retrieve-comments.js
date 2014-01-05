(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-comments/fixture/';
  describe('unit test -- retrieve-comments', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-comments', ['users', 'messages', 'locations', 'interesting-points', 'interesting-point-sessions'], done);
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
      }, function(channels, responseData){
        channels.interestingPointsChannel.emit('retrieve-comments', {}, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.result.should.eql('failed');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('评论所在会话不存在时，返回错误信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels, responseData){
        channels.interestingPointsChannel.emit('retrieve-comments', {
          ipsid: 'inexistence-interesting-point-session-id'
        }, function(data){
          data.should.have.property('result');
          data.should.have.property('errors');
          data.result.should.eql('failed');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('评论所在兴趣点是私有时，只有创建者、被分享、被@用户能够查询到数据', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(xiaodong){
        socketHelper.getClient({
          uid: 'uid-2',
          loggedIn: true
        }, function(baixin){
          socketHelper.getClient({
            uid: 'uid-3',
            loggedIn: true
          }, function(wangyu){
            socketHelper.getClient({
              uid: 'uid-4',
              loggedIn: true
            }, function(weike){
              var requestData, waiter, waiter1, waiter2, waiter3, waiter4;
              requestData = {
                ipsid: 'ipsid-1',
                skip: 0,
                limit: 10
              };
              waiter = new utils.AllDoneWaiter(done);
              waiter1 = waiter.addWaitingFunction();
              waiter2 = waiter.addWaitingFunction();
              waiter3 = waiter.addWaitingFunction();
              waiter4 = waiter.addWaitingFunction();
              xiaodong.interestingPointsChannel.emit('retrieve-comments', requestData, function(data){
                data.comments.length.should.above(0);
                waiter1();
              });
              baixin.interestingPointsChannel.emit('retrieve-comments', requestData, function(data){
                data.comments.length.should.above(0);
                waiter2();
              });
              wangyu.interestingPointsChannel.emit('retrieve-comments', requestData, function(data){
                data.comments.length.should.above(0);
                waiter3();
              });
              weike.interestingPointsChannel.emit('retrieve-comments', requestData, function(data){
                data.result.should.eql('failed');
                data.errors.length.should.above(0);
                waiter4();
              });
            });
          });
        });
      });
    });
    can('若没有设置last-access-time，可以根据skip, limit, sort获取历史数据', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-comments', {
          ipsid: 'ipsid-2',
          skip: 0,
          limit: 3
        }, function(data){
          var oldestComment, ref$;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('comments');
          data.comments.length.should.below(4);
          oldestComment = (ref$ = data.comments)[ref$.length - 1];
          channels.interestingPointsChannel.emit('retrieve-comments', {
            ipsid: 'ipsid-2',
            skip: 0,
            limit: 3,
            sort: 0
          }, function(data){
            var newestComment, ref$;
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            data.should.have.property('comments');
            data.comments.length.should.below(4);
            newestComment = (ref$ = data.comments)[ref$.length - 1];
            (newestComment.createTime > oldestComment.createTime).should.be['true'];
            done();
          });
        });
      });
    });
    can('若设置了last-access-time，可以根据last-access-time和limit获取最新数据', function(done){
      var lastAccessTime;
      lastAccessTime = '' + new Date;
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-comments', {
          ipsid: 'ipsid-2',
          lastAccessTime: lastAccessTime,
          skip: 1000,
          limit: 3
        }, function(data){
          var randomIndex;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('comments');
          data.comments.length.should.below(4);
          randomIndex = Math.random() * data.comments.length >> 0;
          (data.comments[randomIndex].createTime > JSON.stringify(new Date(lastAccessTime))).should.be['true'];
          done();
        });
      });
    });
    can('若查询内容中有匿名评论，该匿名评论的创建者信息会被隐藏', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('retrieve-comments', {
          ipsid: 'ipsid-3',
          skip: 0,
          limit: 1
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('comments');
          data.comments[0].isAnonymous.should.be['true'];
          data.comments[0].should.have.property('sendBy');
          data.comments[0].sendBy.username.should.eql('匿名用户');
          data.comments[0].sendBy._id.should.eql('');
          done();
        });
      });
    });
  });
}).call(this);
