chat =
  * _id: 'cid-1'
    type: 'private-chat'
    name: '聊天室1'
    signature: ''
    joins:
      * user-id: 'uid-1'
        join-time: '2013-02-11 04:03:13'
      * user-id: 'uid-2'
        join-time: '2013-02-11 04:03:13'
    leaves: []

  * _id: 'cid-2'
    type: 'group-chat'
    name: '聊天室2'
    signature: ''
    joins:
      * user-id: 'uid-1'
        join-time: '2013-02-11 04:02:13' # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-2'
        join-time: '2013-02-11 04:02:13' # uid-1发起了chat，时间是2013-02-11 04:02:13
      * user-id: 'uid-3'
        join-time: '2013-02-11 04:02:13' # uid-1发起了chat，时间是2013-02-11 04:02:13
    leaves: []
  ...
