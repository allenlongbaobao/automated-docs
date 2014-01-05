users =
  * _id: 'uid-1'
    username: 'xiaodong'
    password: 'xxxxxxxx' # sha1 加密之后
    gender: 'F' # M | F | U (不确定)
    emails: # emails[0]为主email
      'xiaodong@some.com'
      ...
    avatars: # avatars[0]是当前使用的。
      '/avatars/u/uid/2' # u开头是用户上传的，资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/u/uid/1' # 资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/s/1'     # s开头是系统提供的资源为：http://at-plus-server/avatars/s/1
    signatures: # signatures[0]为当前使用的
      '彪悍的人生不需要解释'
      ...
    third-part-accounts: []
    circles: []
    friends: # friends是双向的
      * name: '' # 默认未分组好友
        users: []
      ...
    followers: []
    followings: []
    attended-locations: ['lid-1']
    watching-locations: []
    created-interesting-points: []
    watching-interesting-points: []
    unwatching-interesting-points: [] # 曾经关注，但是现在取消了的。用于恢复关注。
    created-interesting-point-sessions: []
    watching-interesting-point-sessions: []
    unwatching-interesting-point-sessions: [] # 曾经关注，现在取消
    created-comments: []
    mentioned-interesting-points: []
    mentioned-comments: []
    mentioned-replies: []
    private-chats: []
    group-chats: []

    leave-chats: [] # 曾经参加，但是现在退出
  * _id: 'uid-2'
    username: 'baixin'
    password: 'xxxxxxxx' # sha1 加密之后
    gender: 'F' # M | F | U (不确定)
    emails: # emails[0]为主email
      'baixin@some.com'
      ...
    avatars: # avatars[0]是当前使用的。
      '/avatars/u/uid/2' # u开头是用户上传的，资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/u/uid/1' # 资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/s/1'     # s开头是系统提供的资源为：http://at-plus-server/avatars/s/1
    signatures: # signatures[0]为当前使用的
      '彪悍的人生不需要解释'
      ...
    third-part-accounts: []
    circles: []
    friends: # friends是双向的
      * name: '' # 默认未分组好友
        users: []
      ...
    followers: []
    followings: []
    watching-locations: []
    created-interesting-points: []
    watching-interesting-points: []
    unwatching-interesting-points: [] # 曾经关注，但是现在取消了的。用于恢复关注。
    created-interesting-point-sessions: []
    watching-interesting-point-sessions: []
    unwatching-interesting-point-sessions: [] # 曾经关注，现在取消
    created-comments: []
    mentioned-interesting-points: []
    mentioned-comments: []
    mentioned-replies: []
    private-chats: []
    group-chats: []

    leave-chats: [] # 曾经参加，但是现在退出
  ...
