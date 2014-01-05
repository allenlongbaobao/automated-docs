(function(){
  var responseCreateANewComment;
  responseCreateANewComment = {
    result: "success",
    errors: [],
    createdComment: {
      _id: 'mid-1',
      type: 'ip-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '@+ is wonderful',
      voiceContent: '/voice/xxxx',
      atUsers: ['uid-1', 'uid-2'],
      createTime: '2013-02-05 12:00:00',
      sendBy: {
        _id: 'uid-1',
        username: 'Shin',
        gender: 'M',
        email: 'bossonchan@gmail.com',
        avatar: '/avatars/u/uid-1/1',
        signature: '@+ is awesome!!'
      },
      isAnonymous: false,
      likedBy: [],
      reposts: [{
        type: 'weibo',
        repostId: 'xxxx',
        url: 'http://weibo.com/xxx'
      }],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/2133453452',
      permlink: 'http://at-plus.com/xxx'
    }
  };
}).call(this);
