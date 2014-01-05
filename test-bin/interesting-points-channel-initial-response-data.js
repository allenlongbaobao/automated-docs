(function(){
  var interestingPointsResponseInitialData;
  interestingPointsResponseInitialData = {
    hotsInterestingPoints: [{
      _id: 'ipid-1',
      type: 'web',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-08-09 12:23:33',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'web',
        url: 'http://some.com',
        atPosition: {
          isExist: true,
          positionWithinWebPage: {
            relatedTextContent: '人们可以在任何网页上自由评论，吐槽',
            relatedImage: 'http://some.com/images/1.jpg',
            pinPointDom: '.content div span 0',
            offset: {
              x: '10em',
              y: '15em'
            },
            size: {
              width: '20em',
              height: '30em'
            }
          }
        }
      },
      createdBy: ['uid-2'],
      isPrivate: false,
      shardWith: ['uid-2', 'uid-4'],
      watchedBy: ['uid-3', 'uid-5'],
      pictures: [{
        type: 'snapshot',
        url: '/user-pictures/uid-1/1'
      }],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxxx',
        url: 'http://weibo.com/xxxx'
      }],
      tags: ['tid-1', 'tid-2']
    }],
    circlesInterestingPoints: [{
      _id: 'ipid-1',
      type: 'web',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-08-09 12:23:33',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'web',
        url: 'http://some.com',
        atPosition: {
          isExist: true,
          positionWithinWebPage: {
            relatedTextContent: '人们可以在任何网页上自由评论，吐槽',
            relatedImage: 'http://some.com/images/1.jpg',
            pinPointDom: '.content div span 0',
            offset: {
              x: '10em',
              y: '15em'
            },
            size: {
              width: '20em',
              height: '30em'
            }
          }
        }
      },
      createdBy: ['uid-2'],
      isPrivate: false,
      shardWith: ['uid-2', 'uid-4'],
      watchedBy: ['uid-3', 'uid-5'],
      pictures: [{
        type: 'snapshot',
        url: '/user-pictures/uid-1/1'
      }],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxxx',
        url: 'http://weibo.com/xxxx'
      }],
      tags: ['tid-1', 'tid-2']
    }],
    createdInterestingPoints: [{
      _id: 'ipid-1',
      type: 'web',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-08-09 12:23:33',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'web',
        url: 'http://some.com',
        atPosition: {
          isExist: true,
          positionWithinWebPage: {
            relatedTextContent: '人们可以在任何网页上自由评论，吐槽',
            relatedImage: 'http://some.com/images/1.jpg',
            pinPointDom: '.content div span 0',
            offset: {
              x: '10em',
              y: '15em'
            },
            size: {
              width: '20em',
              height: '30em'
            }
          }
        }
      },
      createdBy: ['uid-2'],
      isPrivate: false,
      shardWith: ['uid-2', 'uid-4'],
      watchedBy: ['uid-3', 'uid-5'],
      pictures: [{
        type: 'snapshot',
        url: '/user-pictures/uid-1/1'
      }],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxxx',
        url: 'http://weibo.com/xxxx'
      }],
      tags: ['tid-1', 'tid-2']
    }],
    attendedInterestingPoints: [{
      _id: 'ipid-1',
      type: 'web',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-08-09 12:23:33',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'web',
        url: 'http://some.com',
        atPosition: {
          isExist: true,
          positionWithinWebPage: {
            relatedTextContent: '人们可以在任何网页上自由评论，吐槽',
            relatedImage: 'http://some.com/images/1.jpg',
            pinPointDom: '.content div span 0',
            offset: {
              x: '10em',
              y: '15em'
            },
            size: {
              width: '20em',
              height: '30em'
            }
          }
        }
      },
      createdBy: ['uid-2'],
      isPrivate: false,
      shardWith: ['uid-2', 'uid-4'],
      watchedBy: ['uid-3', 'uid-5'],
      pictures: [{
        type: 'snapshot',
        url: '/user-pictures/uid-1/1'
      }],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxxx',
        url: 'http://weibo.com/xxxx'
      }],
      tags: ['tid-1', 'tid-2']
    }],
    watchInterestingPoints: [{
      _id: 'ipid-1',
      type: 'web',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-08-09 12:23:33',
      withinLocation: {
        lid: 'lid-1',
        locationType: 'web',
        url: 'http://some.com',
        atPosition: {
          isExist: true,
          positionWithinWebPage: {
            relatedTextContent: '人们可以在任何网页上自由评论，吐槽',
            relatedImage: 'http://some.com/images/1.jpg',
            pinPointDom: '.content div span 0',
            offset: {
              x: '10em',
              y: '15em'
            },
            size: {
              width: '20em',
              height: '30em'
            }
          }
        }
      },
      createdBy: ['uid-2'],
      isPrivate: false,
      shardWith: ['uid-2', 'uid-4'],
      watchedBy: ['uid-3', 'uid-5'],
      pictures: [{
        type: 'snapshot',
        url: '/user-pictures/uid-1/1'
      }],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxxx',
        url: 'http://weibo.com/xxxx'
      }],
      tags: ['tid-1', 'tid-2']
    }],
    unreadMentionedMessagesCount: 20,
    unreadSessionsUpdatedMessagesCount: 20,
    unreadCommentedMessagesCount: 20,
    unreadRepliedMessagesCount: 20
  };
}).call(this);
