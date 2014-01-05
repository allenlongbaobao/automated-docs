(function(){
  var responseRetrieveNearbyInterestingPoints;
  responseRetrieveNearbyInterestingPoints = {
    result: "success",
    errors: [],
    interestingPointsCount: 10,
    interstingPoints: [{
      _id: 'xxxx',
      type: 'web',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-08-18 23:11:09',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'real',
        longitude: 123,
        altitude: 123,
        latitude: 123,
        name: '中山大学体育馆',
        atPosition: {
          positionWithinRealWorldLocation: {
            longitude: 123,
            latitude: 123,
            altitude: 123
          }
        }
      },
      createdBy: {
        _id: 'uid-1',
        username: '张三',
        gender: 'F',
        avatar: '/avatars/u/uid/1',
        signature: '我是张三'
      },
      isPrivate: false,
      interestingPointSessionsCount: 20,
      sharedWith: ['uid-2', 'uid-3'],
      watchedBy: ['uid-4', 'uid-5'],
      atUsers: [],
      likedBy: [],
      pictures: [{
        type: 'photo',
        url: '/user-pictures/uid-1/1',
        highlights: {
          offset: {
            x: 123,
            y: 123
          },
          size: {
            width: 123,
            height: 123
          }
        }
      }],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxx',
        url: 'http://weibo.com/xxxx'
      }],
      tags: [{
        _tid: 'tid-1',
        name: '中山大学',
        alias: ['中大', 'Sun yat-san University']
      }]
    }]
  };
}).call(this);
