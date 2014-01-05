response-login =
  result: 'success'
  errors: []
  user:
    _id: 'uid-1'
    username: 'Shin'
    gender: 'M'
    email: 'bossonchan@gmail.com'
    avatar: '/avatars/u/uid-1/1'
    signature: '@+ is awesome!!'

    # 好友
    accepted-friends: # 好友请求被接受，前端需要自己生成未读消息
      * _id: 'uid-2'
        username: 'Bosson'
        gender: 'M'
        email: 'bossonchan@gmail.com'
        avatar: '/avatars/u/uid-1'
        signature: '@+ is awesome!!'
        status: 'online' # offline
      ...
    rejected-friends: # 好友请求被拒绝，前端需要自己生成未读消息
      * _id: 'uid-3'
        username: 'iamshin'
      ...
    pending-friends: # 好友请求待验证
      * _id: 'uid-4'
        username: 'iambosson'
      ...
    active-friends: # 已经确定是好友的用户，这里默认先返回20个
      * _id: 'uid-2'
        username: 'Bosson'
        gender: 'M'
        email: 'bossonchan@gmail.com'
        avatar: '/avatars/u/uid-1'
        signature: '@+ is awesome!!'
        status: 'online' # offline
      ...

    # 群组 
    accepted-circle: # 加入申请被接受，前端需要自己生成未读消息
      * _id: 'cid-1'
        name: '@+ 小组'
        creator:
          _id: 'uid-3'
          username: 'iamshin'
          gender: 'M'
          email: 'bossonchan@gmail.com'
          avatar: '/avatars/u/uid-1/2'
          signature: '@+ is awesome!!'
          status: 'online' # offline
        create-time: '2013/03/03 12:00:32'
        avatar: '/avatars/c/cid-1/2' # 群组头像 
        members-count: 40  # 群组成员数量
      ...
    rejected-circle: # 加入申请被拒绝，前端需要自己生成未读消息
      * _id: 'cid-1'
        name: '@+ 小组'
        creator:
          _id: 'uid-3'
          username: 'iamshin'
          gender: 'M'
          email: 'bossonchan@gmail.com'
          avatar: '/avatars/u/uid-1/2'
          signature: '@+ is awesome!!'
          status: 'online' # offline
        create-time: '2013/03/03 12:00:32'
        avatar: '/avatars/c/cid-1/2' # 群组头像 
        members-count: 40  # 群组成员数量
      ...

    pending-circles: # 加入申请还未被处理
      * _id: 'cid-1'
        name: '@+ 小组'
      ...

    active-circles: # 已经确认过的群组
      * _id: 'cid-1'
        name: '@+ 小组'
        creator:
          _id: 'uid-3'
          username: 'iamshin'
          gender: 'M'
          email: 'bossonchan@gmail.com'
          avatar: '/avatars/u/uid-1/2'
          signature: '@+ is awesome!!'
          status: 'online' # offline
        create-time: '2013/03/03 12:00:32'
        avatar: '/avatars/c/cid-1/2' # 群组头像 
        members-count: 40  # 群组成员数量
      ...
