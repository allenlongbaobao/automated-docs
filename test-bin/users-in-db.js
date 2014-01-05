(function(){
  var users, xiaodong, baxin, OTHER_ONE_NOT_FOUND_IN_TEST;
  users = [
    xiaodong = {
      _id: 'uid-1',
      username: '小东',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid-1/2', '/avatars/u/uid-1/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          uid: 'uid-10',
          status: 'rejected'
        }, {
          name: '大学同学',
          uid: 'uid-7',
          status: 'accepted'
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      joinChats: [{
        cid: 'cid-1',
        name: '聊天室1',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }, baxin = {
      _id: 'uid-2',
      username: '张三',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          uid: 'uid-10',
          status: 'pending'
        }, {
          name: '大学同学',
          uid: 'uid-3',
          status: 'active'
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      joinChats: [{
        cid: 'cid-1',
        name: '聊天室1',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }, OTHER_ONE_NOT_FOUND_IN_TEST = {
      _id: 'uid-x',
      username: '不会在测试中被发现的人',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['mr-invisible@some.com'],
      avatars: ['/avatars/s/1']
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: '伟科',
      password: '123456',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date()
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: '2012-12-12 01:01:01'
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date()
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [{
        ipid: 'ipid-1',
        status: 'pending'
      }],
      mentionedComments: [{
        cid: 'mid-1',
        status: 'pending'
      }],
      mentionedReplies: [{
        rid: 'mid-1',
        status: 'pending'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'mid-1',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: '2011-01-01 12:12:12'
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date()
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [{
        ipid: 'ipid-1',
        status: 'pending'
      }],
      mentionedComments: [{
        cid: 'mid-1',
        status: 'pending'
      }],
      mentionedReplies: [{
        rid: 'mid-1',
        status: 'pending'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'mid-1',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: '2011-01-01 12:12:12'
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [
        {
          ipid: 'ipid-1',
          lastAccessTime: new Date
        }, {
          ipid: 'ipid-2',
          lastAccessTime: new Date
        }
      ],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [
        {
          ipsid: 'ipsid-1',
          lastAccessTime: new Date
        }, {
          ipsid: 'ipsid-2',
          lastAccessTime: new Date
        }
      ],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [
        {
          ipid: 'ipid-1',
          lastAccessTime: new Date
        }, {
          ipid: 'ipid-2',
          lastAccessTime: new Date
        }
      ],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [
        {
          ipsid: 'ipsid-1',
          lastAccessTime: new Date
        }, {
          ipsid: 'ipsid-2',
          lastAccessTime: new Date
        }
      ],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-3',
              status: 'active'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [
        {
          cid: 'cid-1',
          uid: 'uid-1',
          lastAccessTime: '2013-04-02 22:11:04'
        }, {
          cid: 'cid-3',
          uid: 'uid-3',
          lastAccessTime: '2013-04-02 22:11:04'
        }
      ],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '柏信de弟弟',
      password: '123456',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-3',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: '阿信',
      password: '123456',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [
        {
          cid: 'cid-1',
          uid: 'uid-1',
          lastAccessTime: '2013-04-02 22:11:04'
        }, {
          cid: 'cid-3',
          uid: 'uid-3',
          lastAccessTime: '2013-04-02 22:11:04'
        }
      ],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '张三',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }]
    }, {
      _id: 'uid-2',
      username: '李四',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [
        {
          name: '未分组',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: []
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: new Date
      }],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [{
        ipid: 'ipid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [
        {
          name: '未分组',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: []
        }
      ],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['lisi@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [{
    _id: 'uid-1',
    username: '张三',
    password: 'xxxxxxxx',
    gender: 'F',
    emails: ['zhangsan@some.com'],
    avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
    signatures: ['彪悍的人生不需要解释'],
    thirdPartAccounts: [{
      type: 'weibo',
      apiUrl: 'http://weibo.com/api',
      accountName: '张三微博',
      token: 'TOKEN_FOR_AUTHENTICATION'
    }],
    circles: [{
      cid: 'cid-1',
      name: '@+小组',
      lastAccessTime: '2013-04-02 22:11:04',
      status: 'invited'
    }],
    friends: [
      {
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'pending'
        }]
      }, {
        name: '大学同学',
        users: [{
          uid: 'uid-3',
          status: 'active'
        }]
      }, {
        name: '_weibo',
        users: ['昵称1', '昵称2']
      }
    ],
    followers: [{
      uid: 'uid-3',
      status: 'active'
    }],
    followings: ['uid-1', 'uid-2'],
    watchingLocations: [{
      lid: 'lid-1',
      lastAccessTime: '2013-10-23 10:11:11'
    }],
    createdInterestingPoints: [{
      ipid: "ipid-1",
      lastAccessTime: '2013-10-22 10:14:00'
    }],
    watchingInterestingPoints: [{
      ipid: "ipid-1",
      lastAccessTime: '2013-10-22 10:14:00'
    }],
    unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
    createdInterestingPointSessions: [{
      ipid: "ipid-1",
      lastAccessTime: '2013-10-22 10:14:00'
    }],
    watchingInterestingPointSessions: [{
      ipid: "ipid-1",
      lastAccessTime: '2013-10-22 10:14:00'
    }],
    unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
    createdComments: [{
      cid: "mid-1",
      lastAccessTime: '2013-04-02 12:00:00'
    }],
    mentionedInterestingPoints: [{
      ipsid: "ipsid-1",
      status: 'active'
    }],
    mentionedComments: [{
      cid: "mid-1",
      status: 'active'
    }],
    mentionedReplies: [{
      rid: "mid-1",
      status: 'active'
    }],
    privateChats: [{
      cid: 'cid-1',
      uid: 'uid-1',
      lastAccessTime: '2013-04-02 22:11:04'
    }],
    groupChats: [{
      cid: 'cid-2',
      status: 'invited',
      lastAccessTime: '2013-04-02 22:11:04'
    }],
    leaveChats: ['cid-3', 'cid-4']
  }];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '未分组',
          users: [{
            uid: 'uid-2',
            status: 'pending'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }]
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '未分组',
          users: [{
            uid: 'uid-1',
            status: 'requested'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [{
        cid: 'cid-1',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [{
        cid: 'cid-1',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: new Date
      }],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [{
        ipid: 'ipid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-2'],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [{
        ipid: 'ipid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [
        {
          name: '未分组',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: []
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: new Date
      }],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [{
        ipid: 'ipid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [
        {
          name: '未分组',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: new Date
      }],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [{
        ipid: 'ipid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '未分组',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '未分组',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '张三',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }]
    }, {
      _id: 'uid-2',
      username: '李四',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-1',
              status: 'active'
            }, {
              uid: 'uid-3',
              status: 'active'
            }
          ]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }]
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [
        {
          name: '未分组',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: new Date
      }],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [{
        ipid: 'ipid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '未分组',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '未分组',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 12 * 3600 * 1000)
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 12 * 3600 * 1000)
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'accepted'
            }, {
              uid: 'uid-3',
              status: 'rejected'
            }
          ]
        }, {
          name: '大学同学',
          users: []
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: []
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyuu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        lastAccessTime: '2013-01-11 01:12:22'
      }],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: '2013-01-11 01:12:22'
      }],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        lastAccessTime: '2013-01-11 01:12:22'
      }],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: '2013-01-11 01:12:22'
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: '2013-01-11 01:12:22'
      }],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date()
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [{
        cid: 'cid-1',
        status: 'pending'
      }],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date()
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [{
        ipid: 'ipid-1',
        status: 'pending'
      }],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date()
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [{
        rid: 'rid-1',
        status: 'pending'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date()
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date((new Date).getTime() - 12 * 3600 * 1000)
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 12 * 3600 * 1000)
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 12 * 3600 * 1000)
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [
          {
            uid: 'uid-3',
            status: 'rejected'
          }, {
            uid: 'uid-2',
            status: 'accepted'
          }
        ]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: new Date()
      }],
      groupChats: [
        {
          cid: 'cid-2',
          status: 'active',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-3',
          status: 'active',
          lastAccessTime: new Date()
        }
      ],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'active',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: new Date()
      }],
      groupChats: [
        {
          cid: 'cid-2',
          status: 'active',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-3',
          status: 'active',
          lastAccessTime: new Date()
        }
      ],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'active',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '张三',
      password: '123456',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-3',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'active'
            }, {
              uid: 'uid-5',
              status: 'active'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }]
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/3', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [{
        uid: 'uid-1',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }]
    }, {
      _id: 'uid-4',
      username: '小龙',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaolong@some.com'],
      avatars: ['/avatars/u/uid/4', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }, {
      _id: 'uid-5',
      username: '伟科',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/5', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: new Date(2010, 10, 10)
      }],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [
        {
          cid: 'cid-2',
          lastAccessTime: new Date(2010, 9, 10)
        }, {
          cid: 'cid-3',
          lastAccessTime: new Date(2010, 9, 10)
        }, {
          cid: 'cid-4',
          lastAccessTime: new Date(2010, 9, 10)
        }
      ],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [
        {
          cid: 'cid-2',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-3',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-4',
          lastAccessTime: new Date()
        }
      ],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [
        {
          cid: 'cid-3',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-4',
          lastAccessTime: new Date()
        }
      ],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [{
        ipid: 'ipid-1',
        status: 'pending'
      }],
      mentionedComments: [{
        cid: 'mid-1',
        status: 'pending'
      }],
      mentionedReplies: [{
        rid: 'mid-1',
        status: 'pending'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: '2012-01-01 12:12:12'
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [{
        ipid: 'ipid-1',
        status: 'pending'
      }],
      mentionedComments: [{
        cid: 'mid-1',
        status: 'pending'
      }],
      mentionedReplies: [{
        rid: 'mid-1',
        status: 'pending'
      }],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-5',
      username: 'jiahua',
      password: 'xxxxxxxx',
      gender: 'M',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [
        {
          cid: 'cid-2',
          uid: 'uid-2',
          lastAccessTime: new Date(2010, 1, 1)
        }, {
          cid: 'cid-3',
          uid: 'uid-3',
          lastAccessTime: new Date(2010, 1, 1)
        }
      ],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-2',
        uid: 'uid-1',
        lastAccessTime: new Date(2010, 9, 10)
      }],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-3',
        uid: 'uid-1',
        lastAccessTime: new Date(2010, 9, 10)
      }],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: {
        ipid: 'ipid-2',
        lastAccessTime: new Date
      },
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-2',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [
        {
          cid: 'cid-1',
          lastAccessTime: new Date
        }, {
          cid: 'cid-2',
          lastAccessTime: new Date
        }, {
          cid: 'cid-3',
          lastAccessTime: new Date
        }
      ],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [
        {
          cid: 'cid-4',
          lastAccessTime: new Date
        }, {
          cid: 'cid-5',
          lastAccessTime: new Date
        }
      ],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [{
        ipid: 'ipid-1',
        status: 'pending'
      }],
      mentionedComments: [
        {
          cid: 'cid-1',
          status: 'pending'
        }, {
          cid: 'cid-2',
          status: 'active'
        }
      ],
      mentionedReplies: [
        {
          rid: 'rid-1',
          status: 'active'
        }, {
          rid: 'rid-2',
          status: 'pending'
        }, {
          rid: 'rid-3',
          status: 'pending'
        }
      ],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [
        {
          cid: 'cid-1',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-2',
          lastAccessTime: new Date()
        }
      ],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [{
        cid: 'cid-1',
        lastAccessTime: new Date((new Date).getTime() - 24 * 3600 * 1000)
      }],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['weike@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [{
        ipid: 'ipid-1',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      watchingInterestingPoints: [{
        ipid: 'ipid-2',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [{
        ipsid: 'ipsid-1',
        lastAccessTime: new Date((new Date).getTime() - 23 * 3600 * 1000)
      }],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: {
        ipid: 'ipid-2',
        lastAccessTime: new Date
      },
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [
        {
          ipsid: 'ipsid-2',
          lastAccessTime: new Date
        }, {
          ipsid: 'ipsid-3',
          lastAccessTime: new Date
        }, {
          ipsid: 'ipsid-4',
          lastAccessTime: new Date
        }
      ],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [
        {
          ipsid: 'ipsid-5',
          lastAccessTime: new Date
        }, {
          ipsid: 'ipsid-6',
          lastAccessTime: new Date
        }, {
          ipsid: 'ipsid-7',
          lastAccessTime: new Date
        }
      ],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-3',
          status: 'rejected'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [
          {
            uid: 'uid-3',
            status: 'requested'
          }, {
            uid: 'uid-2',
            status: 'requested'
          }
        ]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '张三',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '未分组',
          users: []
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }]
    }, {
      _id: 'uid-2',
      username: '李四',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '未分组',
          users: []
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [{
        cid: 'cid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-4',
      username: 'weike',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: ['lid-1'],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: "2012-12-22 12:22:22"
      }],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: new Date()
      }],
      groupChats: [
        {
          cid: 'cid-2',
          status: 'active',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-3',
          status: 'active',
          lastAccessTime: new Date()
        }
      ],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'active',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [{
        cid: 'cid-2',
        status: 'active',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '小东',
      password: '123456',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/1', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [
            {
              uid: 'uid-2',
              status: 'active'
            }, {
              uid: 'uid-4',
              status: 'pending'
            }
          ]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-5',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: []
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-2',
        lastAccessTime: new Date()
      }],
      groupChats: [
        {
          cid: 'cid-2',
          status: 'active',
          lastAccessTime: new Date()
        }, {
          cid: 'cid-3',
          status: 'active',
          lastAccessTime: new Date()
        }
      ],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: '柏信',
      password: '123456',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: new Date()
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'active',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: '王瑜',
      password: '123456',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [{
        name: '',
        users: []
      }],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [],
      groupChats: [{
        cid: 'cid-2',
        status: 'active',
        lastAccessTime: new Date()
      }],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: 'xiaodong',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['xiaodong@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '未分组',
        users: [{
          uid: 'uid-2',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      attendedLocations: ['lid-1'],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-2',
      username: 'baixin',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['baixin@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '',
        users: [{
          uid: 'uid-1',
          status: 'active'
        }]
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }, {
      _id: 'uid-3',
      username: 'wangyu',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['wangyu@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [],
      circles: [],
      friends: [{
        name: '未分组',
        users: []
      }],
      followers: [],
      followings: [],
      watchingLocations: [],
      createdInterestingPoints: [],
      watchingInterestingPoints: [],
      unwatchingInterestingPoints: [],
      createdInterestingPointSessions: [],
      watchingInterestingPointSessions: [],
      unwatchingInterestingPointSessions: [],
      createdComments: [],
      mentionedInterestingPoints: [],
      mentionedComments: [],
      mentionedReplies: [],
      privateChats: [],
      groupChats: [],
      leaveChats: []
    }
  ];
}).call(this);

(function(){
  var users;
  users = [
    {
      _id: 'uid-1',
      username: '张三',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'invited'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-2',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }, {
      _id: 'uid-2',
      username: '李四',
      password: 'xxxxxxxx',
      gender: 'F',
      emails: ['zhangsan@some.com'],
      avatars: ['/avatars/u/uid/2', '/avatars/u/uid/1', '/avatars/s/1'],
      signatures: ['彪悍的人生不需要解释'],
      thirdPartAccounts: [{
        type: 'weibo',
        apiUrl: 'http://weibo.com/api',
        accountName: '张三微博',
        token: 'TOKEN_FOR_AUTHENTICATION'
      }],
      circles: [{
        cid: 'cid-1',
        name: '@+小组',
        lastAccessTime: '2013-04-02 22:11:04',
        status: 'active'
      }],
      friends: [
        {
          name: '',
          users: [{
            uid: 'uid-1',
            status: 'active'
          }]
        }, {
          name: '大学同学',
          users: [{
            uid: 'uid-3',
            status: 'active'
          }]
        }, {
          name: '_weibo',
          users: ['昵称1', '昵称2']
        }
      ],
      followers: [{
        uid: 'uid-3',
        status: 'active'
      }],
      followings: ['uid-1', 'uid-2'],
      watchingLocations: [{
        lid: 'lid-1',
        lastAccessTime: '2013-10-23 10:11:11'
      }],
      createdInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPoints: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPoints: ['ipid-7', 'ipid-8'],
      createdInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      watchingInterestingPointSessions: [{
        ipid: "ipid-1",
        lastAccessTime: '2013-10-22 10:14:00'
      }],
      unwatchingInterestingPointSessions: ['ipsid-1', 'ipsid-2'],
      createdComments: [{
        cid: "mid-1",
        lastAccessTime: '2013-04-02 12:00:00'
      }],
      mentionedInterestingPoints: [{
        ipsid: "ipsid-1",
        status: 'active'
      }],
      mentionedComments: [{
        cid: "mid-1",
        status: 'active'
      }],
      mentionedReplies: [{
        rid: "mid-1",
        status: 'active'
      }],
      privateChats: [{
        cid: 'cid-1',
        uid: 'uid-1',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      groupChats: [{
        cid: 'cid-2',
        status: 'invited',
        lastAccessTime: '2013-04-02 22:11:04'
      }],
      leaveChats: ['cid-3', 'cid-4']
    }
  ];
}).call(this);
