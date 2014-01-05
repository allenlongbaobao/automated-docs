(function(){
  var FIXTURE_PATH, requestCreateANewWebInterestingPoint, requestCreateANewComment;
  FIXTURE_PATH = 'integrated/close-web-page/fixture/';
  requestCreateANewWebInterestingPoint = utils.loadFixture(FIXTURE_PATH + 'request-create-a-new-web-interesting-point');
  requestCreateANewComment = {
    type: 'ips-msg',
    originalContentType: 'text',
    textContent: 'asdkjf',
    voiceContent: 'kasdfjksdjf',
    isAnonymous: false
  };
  describe('integrated test -- close-web-page', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/close-web-page', ['users', 'locations'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回错误信息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.locationsChannel.emit('close-web-page', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('关闭没有打开过的页面，可以正常操作', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.locationsChannel.emit('close-web-page', {
          lid: '',
          url: 'http://www.not-open.com'
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    can('若是无数据的页面，可以正常关闭', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.locationsChannel.emit('open-web-page', {
          url: 'http://www.not-in-database.com'
        }, function(data){
          channels.locationsChannel.emit('close-web-page', {
            lid: '',
            url: 'http://www.not-in-database.com'
          }, function(data){
            data.should.have.property('result', 'success');
            data.should.have.property('errors')['with'].length(0);
            done();
          });
        });
      });
    });
    can('若是有数据的页面，正常关闭后，不再接收到该页面的兴趣点更新消息', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(observer){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true
        }, function(creator){
          observer.locationsChannel.on('push-interesting-point-updated', function(data){
            data.should.fail('关闭了页面的用户收到了兴趣点更新消息');
          });
          observer.locationsChannel.emit('open-web-page', {
            url: 'http://www.some.com'
          }, function(data){
            observer.locationsChannel.emit('close-web-page', {
              lid: data.openedWebPage._id,
              url: data.openedWebPage.urls[0]
            }, function(data){
              data.should.have.property('result', 'success');
              data.should.have.property('errors')['with'].length(0);
              creator.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
                setTimeout(function(){
                  done();
                }, 200);
              });
            });
          });
        });
      });
    });
    can('能够通知同一个location的其他用户', function(done){
      var waiter, waiter1, waiter2;
      waiter = new utils.AllDoneWaiter(done);
      waiter1 = waiter.addWaitingFunction();
      waiter2 = waiter.addWaitingFunction();
      socketHelper.getClient({
        loggedIn: false,
        urls: ['http://www.some.com']
      }, function(observer){
        socketHelper.getClient({
          uid: 'uid-1',
          loggedIn: true,
          urls: ['http://www.some.com']
        }, function(creator){
          observer.locationsChannel.on('push-active-user-updated', function(data){
            data.should.have.property('location');
            data.location.should.have.property('id', 'lid-1');
            data.should.have.property('user');
            data.user.should.have.property('_id', 'uid-1');
            data.user.should.have.property('username', 'xiaodong');
            data.should.have.property('action', 'leave');
            waiter1();
          });
          creator.locationsChannel.emit('close-web-page', {
            lid: 'lid-1',
            url: 'http://www.some.com'
          }, function(data){
            data.should.have.property('result', 'success');
            waiter2();
          });
        });
      });
    });
    can('如果只有一个tab打开这个页面，close时能够退出该页面上所有打开的兴趣点、会话、评论的room', function(done){
      var waiter, waiter1, waiter2;
      waiter = new utils.AllDoneWaiter(done);
      waiter1 = waiter.addWaitingFunction();
      waiter2 = waiter.addWaitingFunction();
      socketHelper.getClient({
        loggedIn: false
      }, function(observer){
        socketHelper.getClient({
          loggedIn: false,
          urls: ['http://www.some.com']
        }, function(observer2){
          socketHelper.getClient({
            loggedIn: true,
            uid: 'uid-1'
          }, function(creator){
            observer.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
              data.fail('已经关闭了页面仍然收到之前打开过的会话的消息推送');
            });
            observer2.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
              waiter1();
            });
            observer.locationsChannel.emit('open-web-page', {
              url: 'http://www.some.com'
            }, function(data){
              var currentLid, currentUrl;
              currentLid = data.openedWebPage._id;
              currentUrl = data.openedWebPage.urls[0];
              creator.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
                var ipid, ipsid;
                data.should.have.property('result', 'success');
                ipid = data.createdInterestingPoint._id;
                ipsid = data.createdInterestingPoint.interestingPointSession._id;
                observer.interestingPointsChannel.emit('open-interesting-point-and-session', {
                  ipid: ipid,
                  ipsid: ipsid
                }, function(data){
                  observer2.interestingPointsChannel.emit('open-interesting-point-and-session', {
                    ipid: ipid,
                    ipsid: ipsid
                  }, function(data){
                    data.should.have.property('result', 'success');
                    observer.locationsChannel.emit('close-web-page', {
                      lid: currentLid,
                      url: currentUrl
                    }, function(data){
                      data.should.have.property('result', 'success');
                      creator.interestingPointsChannel.emit('create-a-new-comment', (requestCreateANewComment.ipid = ipid, requestCreateANewComment.ipsid = ipsid, requestCreateANewComment), function(data){
                        setTimeout(function(){
                          data.should.have.property('result', 'success');
                          waiter2();
                        }, 100);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    can('如果打开不止一个tab是同一个页面，那么close后仍然能够收到打开的兴趣点、会话、评论的消息推送', function(done){
      var waiter, waiter1, waiter2;
      waiter = new utils.AllDoneWaiter(done);
      waiter1 = waiter.addWaitingFunction();
      waiter2 = waiter.addWaitingFunction();
      socketHelper.getClient({
        loggedIn: false
      }, function(observer){
        socketHelper.getClient({
          loggedIn: true,
          uid: 'uid-1'
        }, function(creator){
          observer.interestingPointsChannel.on('push-comment-updated-in-opening-session', function(data){
            waiter1();
          });
          observer.locationsChannel.emit('open-web-page', {
            url: 'http://www.some.com'
          }, function(data){
            var currentLid, currentUrl;
            currentLid = data.openedWebPage._id;
            currentUrl = data.openedWebPage.urls[0];
            creator.interestingPointsChannel.emit('create-a-new-web-interesting-point', requestCreateANewWebInterestingPoint, function(data){
              var ipid, ipsid;
              data.should.have.property('result', 'success');
              ipid = data.createdInterestingPoint._id;
              ipsid = data.createdInterestingPoint.interestingPointSession._id;
              observer.interestingPointsChannel.emit('open-interesting-point-and-session', {
                ipid: ipid,
                ipsid: ipsid
              }, function(data){
                observer.interestingPointsChannel.emit('open-interesting-point-and-session', {
                  ipid: ipid,
                  ipsid: ipsid
                }, function(data){
                  data.should.have.property('result', 'success');
                  observer.locationsChannel.emit('close-web-page', {
                    lid: currentLid,
                    url: currentUrl
                  }, function(data){
                    data.should.have.property('result', 'success');
                    creator.interestingPointsChannel.emit('create-a-new-comment', (requestCreateANewComment.ipid = ipid, requestCreateANewComment.ipsid = ipsid, requestCreateANewComment), function(data){
                      setTimeout(function(){
                        data.should.have.property('result', 'success');
                        waiter2();
                      }, 100);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}).call(this);
