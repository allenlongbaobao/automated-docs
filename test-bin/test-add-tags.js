(function(){
  var FIXTURE_PATH;
  FIXTURE_PATH = 'integrated/add-tags/fixture/';
  describe('integrated test -- add-tags', function(){
    beforeEach(function(done){
      server.start(function(){
        socketHelper.clearAllClientSockets();
        utils.cleanDbAndLoadFixture('integrated/add-tags', ['users', 'locations', 'interesting-points'], done);
      });
    });
    afterEach(function(done){
      socketHelper.SocketsDestroyer.get().destroyAll();
      server.shutdown();
      done();
    });
    can('请求报文出错时，能够给回提示信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('add-tags', {}, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('用户未登录时，能够给回未登录提示', function(done){
      socketHelper.getClient({
        loggedIn: false
      }, function(channels){
        channels.interestingPointsChannel.emit('add-tags', {
          ipid: 'ipid-1',
          tags: ['中大']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.should.includeEql({
            message: '事件add-tags需要登录才能完成'
          });
          done();
        });
      });
    });
    can('兴趣点不存在时，能够给回出错信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('add-tags', {
          ipid: 'inexistence-ipid',
          tags: ['中大']
        }, function(data){
          data.should.have.property('result', 'failed');
          data.should.have.property('errors');
          data.errors.length.should.above(0);
          done();
        });
      });
    });
    can('成功添加标签后，能够得到返回信息', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('add-tags', {
          ipid: 'ipid-1',
          tags: ['中大']
        }, function(data){
          data.should.have.property('result', 'success');
          data.should.have.property('errors')['with'].length(0);
          done();
        });
      });
    });
    can('成功添加标签后，能够查询到标签', function(done){
      socketHelper.getClient({
        uid: 'uid-1',
        loggedIn: true
      }, function(channels){
        channels.interestingPointsChannel.emit('add-tags', {
          ipid: 'ipid-1',
          tags: ['中大', '人文', '学术']
        }, function(data){
          channels.locationsChannel.emit('retrieve-interesting-points', {
            lid: 'lid-1',
            offset: 0,
            count: 10
          }, function(data){
            var interestingPont;
            interestingPont = (function(){
              var i$, x$, ref$, len$, results$ = [];
              for (i$ = 0, len$ = (ref$ = data.interestingPoints).length; i$ < len$; ++i$) {
                x$ = ref$[i$];
                if (x$._id === 'ipid-1') {
                  results$.push(x$);
                }
              }
              return results$;
            }())[0];
            interestingPont.tags.should.include('中大');
            interestingPont.tags.should.include('人文');
            interestingPont.tags.should.include('学术');
            done();
          });
        });
      });
    });
  });
}).call(this);
