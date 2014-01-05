(function(){
  var responseCreateANewRealWorldInterestingPoint;
  responseCreateANewRealWorldInterestingPoint = {
    result: 'success',
    errors: [],
    createdInteresingPoint: {
      _id: 'xxxx',
      type: 'web',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-10-22 10:10:10',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'real',
        longitude: 123,
        latitude: 123,
        altitude: 123,
        radius: 10,
        altitudeScope: 5,
        atPosition: {
          isExist: true,
          positionWithinRealWorldLocation: {
            longitude: 123,
            latitude: 123,
            altitude: 123
          }
        }
      },
      createdBy: {
        _id: 'uid-1',
        username: 'Shin',
        gender: 'M',
        email: 'bossonchan@gmail.com',
        avatar: '/avatars/u/uid-1',
        signature: '@+ is awesome!!'
      },
      isPrivate: false,
      interestingPointSessionsCount: 20,
      sharedWith: [],
      watchedBy: [],
      likedBy: [],
      pictures: [{
        type: 'photo',
        url: '/user-pictures/uid-1/1',
        highlights: [{
          offset: {
            x: 123,
            y: 123
          },
          size: {
            width: 123,
            height: 123
          }
        }]
      }],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxx',
        url: 'http://weibo.com/xxxx'
      }],
      tags: [{
        _id: 'tid-1',
        name: '中山大学',
        alias: ['SYSU']
      }],
      interestingPointSession: {
        _id: 'ipsid-1',
        ipid: 'ipid-1',
        title: '无法阻挡的@+',
        createTime: '2013-08-18 23:11:09',
        createdBy: 'uid-1',
        watchedBy: ['uid-4', 'uid-5'],
        commentedBy: ['uid-2', 'gid-3', 'uid-4', 'uid-8'],
        commentsCount: 20,
        likedBy: []
      }
    }
  };
}).call(this);
