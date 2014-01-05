chat =
  * _id: 'cid-1'
    type: 'private-chat'
    name: ''
    signature: ''
    avatar: ''
    joins:
      * user-id: 'uid-1'
        join-time: '2013-02-11 04:02:13' # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        joint-time: '2013-02-11 04:02:15' # uid-2 2013-02-11 04:02:15加入chat
    leaves: []

  * _id: 'cid-2'
    type: 'group'
    name: '聊天室1'
    signature: '我是聊天室1'
    avatar: '/avatar/c/1'
    joins:
      * user-id: 'uid-1'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        joint-time: new Date! # uid-2 2013-02-11 04:02:15加入chat
      * user-id: 'uid-3'
        joint-time: new Date! # uid-2 2013-02-11 04:02:15加入chat
      ...
    leaves: []
