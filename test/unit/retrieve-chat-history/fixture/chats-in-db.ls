chat =
  * _id: 'cid-1'
    type:  'private-chat'
    joins:
      * user-id: 'uid-1'
        join-time: new Date!# uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        joint-time: new Date! # uid-2 2013-02-11 04:02:15加入chat

  * _id: 'cid-2'
    type: 'group-chat'
    name: '聊天室1'
    signature: '@+ is wonderful!'
    joins:
      * user-id: 'uid-1'
        join-time: new Date!# uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        joint-time: new Date! # uid-2 2013-02-11 04:02:15加入chat
    leaves: []

