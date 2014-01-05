(function(){
  var responseCreateANewWebInterestingPoint;
  responseCreateANewWebInterestingPoint = {
    result: "success",
    errors: [],
    createdInterestingPoint: {
      _id: 'xxxx',
      type: 'web',
      title: '无法阻挡的@+',
      content: '好吧。。。',
      createTime: '2013-10-22 12:12:12',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'web',
        url: 'http://at-plus.cn',
        name: '@+主页',
        atPosition: {
          isExist: true,
          positionWithinWebPage: {
            type: 'partial',
            mcs: [{
              id: '',
              path: 'body > div#some-id:eq(2) > div:eq(3) > div:eq(2)',
              html: "<table></table>",
              width: 324,
              height: 200,
              originTop: 123,
              originLeft: 234,
              ipOffset: {
                top: 20,
                left: 10,
                width: 100,
                height: 200
              }
            }],
            calculateTime: '2014-01-03 12:00:12.2345',
            userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
          }
        }
      },
      createdBy: {
        _id: 'uid-1',
        username: 'Shin',
        gender: 'M',
        email: 'bossonchan@gmail.com',
        avatar: '/avatars/u/uid-1/1',
        signature: '@+ is awesome!!'
      },
      isPrivate: false,
      sharedWith: [],
      interestingPointSessionsCount: 1,
      commentsCount: 0,
      watchedBy: [],
      likedBy: [],
      atUsers: [],
      pictures: [{
        type: 'snapshoot',
        url: '/user-pictures/uid-1/1'
      }],
      reposts: [],
      tags: ['tid-1', 'tid-2'],
      interestingPointSession: {
        _id: 'xxxx',
        title: '无法阻挡的@+',
        content: '好吧。。。',
        createTime: '2013-08-18 23:11:09',
        createdBy: {
          _id: 'uid-1',
          username: 'Shin',
          gender: 'M',
          email: 'bossonchan@gmail.com',
          avatar: '/avatars/u/uid-1/1',
          signature: '@+ is awesome!!'
        },
        commentedBy: [],
        watchedBy: [],
        likedBy: [],
        commentsCount: 0
      }
    }
  };
}).call(this);
