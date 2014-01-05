chat =
  * _id: 'cid-1'
    type:  'private-chat'
    name: ''
    signature: ''
    avatar: '/c/cid/1'
    joins:
      * user-id: 'uid-1'
        join-time: new Date!# uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        join-time: new Date! # uid-2 2013-02-11 04:02:15加入chat
      ...

  * _id: 'cid-2'
    type: 'group-chat'
    name: '聊天室1'
    signature: '@+ is wonderful!'
    avatar: 'c/cid/1'
    joins:
      * user-id: 'uid-1'
        join-time: new Date!# uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        join-time: new Date! # uid-2 2013-02-11 04:02:15加入chat
    leaves: []

