circles =
  * _id: 'cid-1'
    name: '@+小组'
    creator: 'uid-1'
    avatar: '/avatars/g/gid-1/1'
    joins:
      * uid: 'uid-2'
        join-time: '2013/03/04 12:11:01'
      ...
    leaves:
      * uid: 'uid-1'
        leave-time: '2013/02/04 11:22:00'
      ...
    invited-users: # 被邀请的用户
      * uid: 'uid-5'
        status: 'pending' # accepted | rejected | pending
      ...
    applied-users: ['uid-4', 'uid-5'] # 申请加入的用户
  ...
