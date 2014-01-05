(function(){
  var responseRetrieveReceivedComments;
  responseRetrieveReceivedComments = {
    result: "success",
    errors: [],
    comments: [{
      _id: 'mid-1',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 20,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: 'voice/vid-1',
      atUsers: ['uid-1', 'uid-2', 'uid-3'],
      createTime: '2013-02-04 12:00:00',
      sendBy: {
        _id: 'uid-1',
        username: 'Shin',
        gender: 'M',
        email: 'bossonchan@gmail.com',
        avatar: '/avatars/u/uid-1/1',
        signature: '@+ is awesome !!'
      },
      isAnonymous: false,
      likedBy: ['uid-1'],
      reposts: [{
        type: 'weibo',
        repostId: 'xxx',
        url: 'http://weibo.com/xxxx'
      }],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx',
      interestingPointSession: {
        _id: 'ipsid-1',
        ipid: 'ipid-1',
        title: '支持恒大的进来！！',
        createdBy: 'uid-1',
        createTime: '2013-10-11 12:00:13',
        watchedBy: ['uid-1', 'uid-2'],
        commentedBy: ['uid-1', 'uid-2'],
        commentsCount: 20,
        likedBy: ['uid-1']
      }
    }]
  };
}).call(this);
