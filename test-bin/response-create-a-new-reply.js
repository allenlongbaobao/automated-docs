(function(){
  var responseCreateANewReply;
  responseCreateANewReply = {
    result: "success",
    errors: [],
    createdReply: {
      _id: 'rid-1',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originContentType: 'text',
      textContent: '@+ is awesome!!',
      voiceContent: '/voice/xxx',
      atUsers: [],
      createTime: '2013-01-01 12:12:12',
      sendBy: {
        _id: 'uid-1',
        username: 'Shin',
        gender: 'M',
        signature: '@+ is awesome!!',
        email: 'bossonchan@gmail.com'
      },
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdParty: false,
      originUrl: 'http://weibo.com/xxx',
      permlink: 'http://at-plus.com/xxx'
    }
  };
}).call(this);
