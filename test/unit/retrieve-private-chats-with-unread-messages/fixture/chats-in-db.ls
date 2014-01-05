chat =
  * _id: 'cid-2'
    type: 'private-chat' # 'private-chat'
    joins:
      * user-id: 'uid-1'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
    leaves: []

  * _id: 'cid-3'
    type: 'private-chat' # 'private-chat'
    joins:
      * user-id: 'uid-1'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-3'
        join-time: new Date! # uid-1发起了chat，时间是2013-02-11 04:02:13
    leaves: []
