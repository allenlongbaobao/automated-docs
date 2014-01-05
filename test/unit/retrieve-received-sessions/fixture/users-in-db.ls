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
        users:
          * uid: 'uid-2'
            status: 'active' # pending | accepted | rejected | requested | inactive | active 其中除了pending和active状态，其他状态都会生成未读消息
          ...
      ...
    followers: []
    followings: []
    watching-locations: []
    created-interesting-points:
      * ipid: 'ipid-1'
        last-access-time: new Date((new Date).get-time! - 23 * 3600 * 1000)
      ...
    watching-interesting-points:
      * ipid: 'ipid-2'
        last-access-time: new Date((new Date).get-time! - 23 * 3600 * 1000)
      ...
    unwatching-interesting-points: [] # 曾经关注，但是现在取消了的。用于恢复关注。
    created-interesting-point-sessions:
      * ipsid: 'ipsid-1'
        last-access-time: new Date((new Date).get-time! - 23 * 3600 * 1000)
      ...
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
        users:
          * uid: 'uid-1'
            status: 'active' # pending | accepted | rejected | requested | inactive | active 其中除了pending和active状态，其他状态都会生成未读消息
          ...
      ...
    followers: []
    followings: []
    watching-locations: []
    created-interesting-points:
      * ipid: 'ipid-2'
        last-access-time: new Date
    watching-interesting-points: []
    unwatching-interesting-points: [] # 曾经关注，但是现在取消了的。用于恢复关注。
    created-interesting-point-sessions:
      * ipsid: 'ipsid-2'
        last-access-time: new Date
      * ipsid: 'ipsid-3'
        last-access-time: new Date
      * ipsid: 'ipsid-4'
        last-access-time: new Date
      ...
    watching-interesting-point-sessions: []
    unwatching-interesting-point-sessions: [] # 曾经关注，现在取消
    created-comments: []
    mentioned-interesting-points: []
    mentioned-comments: []
    mentioned-replies: []
    private-chats: []
    group-chats: []
    leave-chats: [] # 曾经参加，但是现在退出
  * _id: 'uid-3'
    username: 'wangyu'
    password: 'xxxxxxxx' # sha1 加密之后
    gender: 'F' # M | F | U (不确定)
    emails: # emails[0]为主email
      'wangyu@some.com'
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
    friends:
      * name: ''
        users: []
      ...
    followers: []
    followings: []
    watching-locations: []
    created-interesting-points: []
    watching-interesting-points: []
    unwatching-interesting-points: [] # 曾经关注，但是现在取消了的。用于恢复关注。
    created-interesting-point-sessions:
      * ipsid: 'ipsid-5'
        last-access-time: new Date
      * ipsid: 'ipsid-6'
        last-access-time: new Date
      * ipsid: 'ipsid-7'
        last-access-time: new Date
      ...
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
