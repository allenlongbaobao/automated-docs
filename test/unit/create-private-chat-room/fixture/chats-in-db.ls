chat =
  _id: 'cid-1'
  type: 'private-chat'
  joins:
    * user-id: 'uid-1'
      join-time: '2013-02-11 04:02:13' # uid-1发起了chat，时间是2013-02-11 04:02:13
    * user-id: 'uid-2'
      joint-time: '2013-02-11 04:02:15' # uid-2 2013-02-11 04:02:15加入chat
  leaves: []