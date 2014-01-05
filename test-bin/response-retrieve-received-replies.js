(function(){
  var responseRetrieveReceivedReplies;
  responseRetrieveReceivedReplies = {
    result: "success",
    errors: [],
    replies: [{
      _id: 'mid-1',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
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
      likedBy: ['uid-1', 'uid-2'],
      reposts: [{
        type: 'weibo',
        repostId: 'xxx',
        url: 'http://weibo.com/xxxx'
      }],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx',
      comment: {
        _id: 'mid-1',
        ipid: 'ipid-1',
        ipsid: 'ipsid-1',
        repliesCount: 20,
        originalContentType: 'text',
        textContent: '快乐无极限',
        voiceContent: 'voice/vid-1',
        atUsers: ['uid-1', 'uid-2', 'uid-3'],
        createTime: '2013-02-04 12:00:00',
        sendBy: 'uid-1',
        isAnonymous: false,
        likedBy: ['uid-1'],
        reposts: [{
          type: 'weibo',
          repostId: 'xxx',
          url: 'http://weibo.com/xxxx'
        }],
        isCopiedFromThirdPart: false,
        originUrl: 'http://weibo.com/xxxx',
        permlink: 'http://at-plus.com/xxxx'
      }
    }]
  };
}).call(this);
