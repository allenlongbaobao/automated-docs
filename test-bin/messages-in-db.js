(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-1',
    ipsid: 'ipsid-1',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: '/voice/0',
    atUsers: [],
    createTime: '2013-02-04 12:03:02',
    sendBy: 'uid-2',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'mid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-2',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-2',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    ipid: 'ipid-1',
    ipsid: 'ipsid-1',
    type: 'ips-msg',
    originalContentType: 'text',
    textContent: 'Just a test.',
    voiceContent: '/kasjdf/',
    sendBy: 'uid-1',
    createTime: new Date((new Date).getTime() - 1 * 3600 * 1000),
    isAnonymous: 0,
    isCopiedFromThirdParty: false,
    permlink: 'xxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'cid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 1,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-1',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-1',
    ipsid: 'ipsid-1',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: '/voice/0',
    atUsers: [],
    createTime: '2013-02-04 12:03:02',
    sendBy: 'uid-2',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'cid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 1,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-1',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var message;
  message = [{
    _id: 'mid-1',
    type: 'chat-msg',
    cid: 'chat-id-1',
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: void 8,
    atUsers: ['uid-1'],
    createTime: '2013-02-04 12:03:02',
    sendBy: 'uid-2',
    isAnonymous: false,
    likedBy: [],
    reposts: [{
      type: 'weibo',
      repostId: 'xxxx',
      url: 'http://weibo.com/xxxx'
    }],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-2',
    ipsid: 'ipsid-2',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: '/voice/0',
    atUsers: [],
    createTime: '2013-02-04 12:03:02',
    sendBy: 'uid-1',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-2',
    ipsid: 'ipsid-2',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: '/voice/0',
    atUsers: [],
    createTime: '2013-02-04 12:03:02',
    sendBy: 'uid-1',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-1',
    ipsid: 'ipsid-1',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: '/voice/0',
    atUsers: [],
    createTime: new Date,
    sendBy: 'uid-2',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-1',
    ipsid: 'ipsid-1',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: '/voice/0',
    atUsers: [],
    createTime: new Date,
    sendBy: 'uid-2',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-1',
    ipsid: 'ipsid-1',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限 @baixin',
    voiceContent: '/voice/0',
    atUsers: ['uid-2'],
    createTime: new Date(),
    sendBy: 'uid-3',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'cid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 1,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-1',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: ['uid-2'],
      createTime: new Date(),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'cid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 1,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 12 * 3600 * 1000),
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-1',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date,
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [{
    _id: 'cid-1',
    type: 'ips-msg',
    ipid: 'ipid-2',
    ipsid: 'ipsid-2',
    repliesCount: 0,
    originalContentType: 'text',
    textContent: '快乐无极限',
    voiceContent: '/voice/0',
    atUsers: [],
    createTime: '2013-02-04 12:03:02',
    sendBy: 'uid-4',
    isAnonymous: false,
    likedBy: [],
    reposts: [],
    isCopiedFromThirdPart: false,
    originUrl: 'http://weibo.com/xxxx',
    permlink: 'http://at-plus.com/xxxx'
  }];
}).call(this);

(function(){
  var message;
  message = [
    {
      _id: 'mid-1',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息1',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-2',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息2',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-3',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息3',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-4',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息4',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-5',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息4',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-6',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息4',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-7',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息4',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-8',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息4',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-9',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息4',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }, {
      _id: 'mid-10',
      type: 'chat-msg',
      cid: 'cid-1',
      originalContentType: 'text',
      textContent: '消息4',
      voiceContent: void 8,
      atUsers: [],
      createTime: new Date(),
      sendBy: 'uid-2'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'mid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-2',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-3',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-4',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-5',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 24 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-6',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 20 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-7',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 10 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-8',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 4 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-9',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 5 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-10',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 10 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-11',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 20 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-12',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 24 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-13',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-3',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date,
      sendBy: 'uid-4',
      isAnonymous: true,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'mid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-2',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-3',
      type: 'ips-msg',
      ipid: 'ipid-3',
      ipsid: 'ipsid-3',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-4',
      type: 'ips-msg',
      ipid: 'ipid-4',
      ipsid: 'ipsid-4',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-5',
      type: 'ips-msg',
      ipid: 'ipid-5',
      ipsid: 'ipsid-5',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-5',
      type: 'ips-msg',
      ipid: 'ipid-6',
      ipsid: 'ipsid-6',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'cid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 24 * 3600 * 1000),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'cid-2',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 12 * 3600 * 1000),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'cid-3',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 12 * 3600 * 1000),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'cid-4',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 12 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'cid-5',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 24 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'cid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 2,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: ['uid-2'],
      createTime: new Date(),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'cid-2',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 1,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: ['uid-2'],
      createTime: new Date(),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-1',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: ['uid-2'],
      createTime: new Date(),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-2',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: ['uid-2'],
      createTime: new Date(),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-3',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-2',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: ['uid-2'],
      createTime: new Date(),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'cid-1',
      type: 'ips-msg',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      repliesCount: 5,
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 24 * 3600 * 1000),
      sendBy: 'uid-2',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-1',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 25 * 3600 * 1000),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-2',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 12 * 3600 * 1000),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-3',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 12 * 3600 * 1000),
      sendBy: 'uid-3',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-4',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 25 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'rid-5',
      type: 'ip-rpl',
      ipid: 'ipid-1',
      ipsid: 'ipsid-1',
      rMid: 'cid-1',
      originalContentType: 'text',
      textContent: '快乐无极限 @baixin',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 12 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);

(function(){
  var messages;
  messages = [
    {
      _id: 'mid-1',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-2',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 20 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-3',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 10 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-4',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() - 5 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-5',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 5 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-6',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 10 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-7',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 20 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-8',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-1',
      rMid: 'mid-1',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date((new Date).getTime() + 24 * 3600 * 1000),
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-9',
      type: 'ips-msg',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      repliesCount: 0,
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: '2013-02-04 12:03:02',
      sendBy: 'uid-4',
      isAnonymous: false,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }, {
      _id: 'mid-10',
      type: 'ip-rpl',
      ipid: 'ipid-2',
      ipsid: 'ipsid-2',
      rMid: 'mid-9',
      originalContentType: 'text',
      textContent: '快乐无极限',
      voiceContent: '/voice/0',
      atUsers: [],
      createTime: new Date,
      sendBy: 'uid-4',
      isAnonymous: true,
      likedBy: [],
      reposts: [],
      isCopiedFromThirdPart: false,
      originUrl: 'http://weibo.com/xxxx',
      permlink: 'http://at-plus.com/xxxx'
    }
  ];
}).call(this);
