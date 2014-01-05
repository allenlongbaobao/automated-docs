(function(){
  var responseCreateANewWebInterestingPointOnANewUrl;
  responseCreateANewWebInterestingPointOnANewUrl = {
    result: 'success',
    errors: [],
    createdLocation: {
      _id: 'xxxx',
      type: 'web',
      name: '@+主页',
      isExisting: true,
      isInternal: false,
      duration: {
        from: '2014-02-04 12:00:04',
        to: '2014-02-04 12:00:04'
      },
      interestingPointsCount: 200,
      watchedBy: ['uid-1', 'uid-2'],
      urls: ['http://some.com']
    },
    createdInterestingPoint: {
      _id: 'xxxx',
      type: 'web',
      title: '无法阻挡的@+',
      content: '好吧。。。',
      createTime: '2013-10-22 12:12:12',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'web',
        url: 'http://some.com',
        name: '@+主页',
        atPosition: {
          isExist: true,
          positionWithinWebPage: {
            type: 'partial',
            mcs: [{
              id: 'mcid-1',
              path: 'body > div#some-id:eq(2) > div:eq(2) > table#foo',
              html: "<table id='foo'> ... </table>",
              width: 324,
              height: 200,
              originTop: 123,
              originLegt: 234,
              ipOffset: {
                top: 20,
                left: 10,
                width: 200,
                height: 100
              }
            }],
            calculateTime: '2013-02-02 12:00:00',
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
      atUsers: [],
      likedBy: [],
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
        commentsCount: 20
      }
    }
  };
}).call(this);
