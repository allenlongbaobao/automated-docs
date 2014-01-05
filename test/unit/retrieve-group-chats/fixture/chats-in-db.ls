chat =
  * _id: 'cid-2'
    type: 'group-chat' # 'private-chat'
    name: '聊天室1'
    signature: '@+ is wonderful'
    avatar: '/c/cid/1'
    joins:
      * user-id: 'uid-1'
      * user-id: 'uid-2'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
    leaves: []

  * _id: 'cid-3'
    type: 'group-chat' # 'private-chat'
    name: '聊天室1'
    signature: '@+ is wonderful'
    avatar: '/c/cid/1'
    joins:
      * user-id: 'uid-1'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-3'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
    leaves: []

  * _id: 'cid-4'
    type: 'group-chat' # 'private-chat'
    name: '聊天室1'
    signature: '@+ is wonderful'
    avatar: '/c/cid/1'
    joins:
      * user-id: 'uid-1'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-3'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
    leaves: []
