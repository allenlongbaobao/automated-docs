(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'unit/retrieve-received-mentions/fixture/';
  describe('unit test -- retrieve-received-mentions', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('unit/retrieve-received-mentions', ['users', 'locations', 'interesting-points', 'interesting-point-sessions', 'messages'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: true,
        uid: 'uid-1'
      }, function(client){
        client.interestingPointsChannel.emit('retrieve-received-mentions', {
          haha: false
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          client.interestingPointsChannel.emit('retrieve-received-mentions', {
            type: 'wrong type'
          }, function(data){
            data.should.have.property('result', 'failed');
            data.should.have.property('errors');
            data.errors.length.should.above(0);
            done();
          });
        });
      });
    });
    can('用户未登录时，能够给回出错信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(client){
        client.interestingPointsChannel.emit('retrieve-received-mentions', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    describe('正常请求时', function(){
      var baixin;
      baixin = null;
      beforeEach(function(done){
        socketHelper.getClient({
          loggedIn: true,
          uid: 'uid-2'
        }, function(baixinChannel){
          baixin = baixinChannel;
          done();
        });
      });
      can('能够得到正确的数据格式', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-mentions', {}, function(data){
          var randomIndex;
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          data.should.have.property('receivedMentions');
          randomIndex = Math.random() * data.receivedMentions.length >> 0;
          data.receivedMentions[randomIndex].should.have.property('mentionType');
          done();
        });
      });
      can('能够通过skip和limit限制返回的数据', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
          skip: 0,
          limit: 3
        }, function(data){
          var theThirdMention;
          data.receivedMentions.length.should.not.above(3);
          theThirdMention = data.receivedMentions[2];
          baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
            skip: 2,
            limit: 2
          }, function(data){
            data.receivedMentions.length.should.not.above(2);
            data.receivedMentions[0]._id.should.eql(theThirdMention._id);
            done();
          });
        });
      });
      can('能够通过from获取由特定用户发送的消息列表', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
          from: 'uid-3'
        }, function(data){
          var i$, x$, ref$, len$;
          data.receivedMentions.length.should.above(0);
          for (i$ = 0, len$ = (ref$ = data.receivedMentions).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            if (x$.mentionType === 'interesting-point') {
              x$.createdBy._id.should.eql('uid-3');
            } else {
              x$.sendBy._id.should.eql('uid-3');
            }
          }
          done();
        });
      });
      can('能够通过type来获取不同类型的@消息', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
          type: 'interesting-point'
        }, function(data){
          var i$, x$, ref$, len$;
          data.receivedMentions.length.should.above(0);
          for (i$ = 0, len$ = (ref$ = data.receivedMentions).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            x$.mentionType.should.eql('interesting-point');
          }
          baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
            type: 'comment'
          }, function(data){
            var i$, x$, ref$, len$;
            data.receivedMentions.length.should.above(0);
            for (i$ = 0, len$ = (ref$ = data.receivedMentions).length; i$ < len$; ++i$) {
              x$ = ref$[i$];
              x$.mentionType.should.eql('comment');
            }
            baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
              type: 'reply'
            }, function(data){
              var i$, x$, ref$, len$;
              data.receivedMentions.length.should.above(0);
              for (i$ = 0, len$ = (ref$ = data.receivedMentions).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                x$.mentionType.should.eql('reply');
              }
              baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
                type: 'all'
              }, function(data){
                data.receivedMentions.length.should.above(0);
                _.uniq((function(){
                  var i$, x$, ref$, len$, results$ = [];
                  for (i$ = 0, len$ = (ref$ = data.receivedMentions).length; i$ < len$; ++i$) {
                    x$ = ref$[i$];
                    results$.push(x$.mentionType);
                  }
                  return results$;
                }())).length.should.eql(3);
                done();
              });
            });
          });
        });
      });
      can('能够通过unread来决定获取是否未读的@消息', function(done){
        baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
          unread: true
        }, function(data){
          data.receivedMentions.length.should.eql(4);
          baixin.interestingPointsChannel.emit('retrieve-received-mentions', {
            unread: false
          }, function(data){
            data.receivedMentions.length.should.eql(6);
            done();
          });
        });
      });
    });
  });
}).call(this);
