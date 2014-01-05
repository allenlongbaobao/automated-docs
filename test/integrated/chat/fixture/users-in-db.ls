users =
  * _id: 'uid-1'
    username: '小东'
    password: '123456' # sha1 加密之后
    gender: 'F' # M | F | U (不确定)
    emails: # emails[0]为主email
      'xiaodong@some.com'
      ...
    avatars: # avatars[0]是当前使用的。
      '/avatars/u/uid/1' # u开头是用户上传的，资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/u/uid/1' # 资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/s/1'     # s开头是系统提供的资源为：http://at-plus-server/avatars/s/1
    signatures: # signatures[0]为当前使用的
      '彪悍的人生不需要解释'
      ...
    third-part-accounts:
      * type: 'weibo' # weibo | qq | ……
        api-url: 'http://weibo.com/api'
        account-name: '张三微博'
        token: 'TOKEN_FOR_AUTHENTICATION'
      ...

    # friendships history
    # 用于记录群组信息和查询未读群组消息
    # status说明:
    #   invited -- 被邀请状态，说明该群组向用户发起了邀请，且用户还没有阅读过该消息
    #   accepted -- 被接受状态，说明用户的加入群组申请被接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户的加入群组申请被拒绝，但用户还未得知该消息
    #   pending -- 待确认状态，说明用户的加入群组申请还在被审核中
    #   active -- 正常状态，说明用户已经加入该群组，并且用户已经确认过这个事实
    circles:
      * cid: 'cid-1'
        name: '@+小组'
        last-access-time: '2013-04-02 22:11:04'
        status: 'invited' # invited | accepted | rejected | pending | active 其中除了pending和active状态，其他状态都会生成未读消息
      ...

    # 用于记录好友信息和查询未读好友消息
    # status说明:
    #   pending -- 待确认状态，说明用户发起的好友请求还没有被对方处理
    #   accepted -- 被接受状态，说明用户发起的好友请求已经被对方接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户发起的好友请求已经被对方拒绝，但用户还未得知该消息
    #   requested -- 被请求状态，说明对方对用户发起了好友请求，并且用户还未处理该请求
    #   inactive -- 被删除状态，说明对方已经将用户从好友中移除，但用户还未得知该消息
    #   active -- 正常状态，说明用户和对方已经是好友，而且已经确认过这个事实
    friends: # friends是双向的
      * name: '' # 默认未分组好友
        users: 
          * uid: 'uid-2'
            status: 'active'
          * uid: 'uid-4'
            status: 'pending'
          ...
      * name: '大学同学' # 用户自定义分组
        users:
          * uid: 'uid-5'
            status: 'active' # pending | accepted | rejected | requested | inactive | active 其中除了pending和active状态，其他状态都会生成未读消息
          ...
      * name: '_weibo'
        users: []  # 用户在微博上的好友，下划线开头的，不是用户自定义的group，是系统分组
    # 用于记录关注用户信息和查询未读关注消息
    # status 说明：
    #   active -- 正常状态，说明用户已经确认过该粉丝
    #   pending -- 待确认状态，说明用户还未确认过该粉丝
    followers: # 关注我的人
      * uid: 'uid-3'
        status: 'active' # active | pending
      ...
    followings: ['uid-1', 'uid-2'] # 我关注的人
   
    # interesting point history
    # 用于记录关注的location记录和查询未读的兴趣点
    watching-locations:
      * lid: 'lid-1'
        last-access-time: '2013-10-23 10:11:11'
      ...
    # 用于记录创建、关注的兴趣点信息和查询未读会话
    created-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-points: ['ipid-7', 'ipid-8'] # 曾经关注，但是现在取消了的。用于恢复关注。
   
    # 用于记录创建、关注的兴趣点会话和查询未读评论
    created-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-point-sessions: ['ipsid-1', 'ipsid-2'] # 曾经关注，现在取消
   
    # 用于记录创建的评论和查询未读回复
    # 注意：因为我们没有获取用户创建评论的需求，因此这里有可能更改为 unread-replies
    created-comments:
      * cid: "mid-1"
        last-access-time: '2013-04-02 12:00:00' # 判断是否未读
      ...
   
    # 用于记录@到我的信息和查询未读@消息
    # status 说明:
    #   active -- 正常状态，说明被@到的用户已经阅读过该消息
    #   inactive -- 删除状态，说明信息源已经被删除
    #   pending -- 待确认状态，说明被@到的用户还没有阅读该消息
   
    mentioned-interesting-points: # 提到我的兴趣点
      * ipsid: "ipsid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-comments: # 提到我的评论
      * cid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-replies: # 提到我的回复
      * rid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
   
    # chats history
    # 用于生成聊天室未读消息
    # status说明：
    #   active -- 正常状态，说明用户已经加入到聊天室中，并且已经确认过该事实
    #   invited -- 被邀请状态，说明用户被邀请到该聊天室，但用户还没有处理该请求
    private-chats: []
   
    group-chats:
      * cid: 'cid-2'
        status: 'invited' # active | invited 其中invited状态会生成未读消息
        last-access-time: '2013-04-02 22:11:04' # 用于查询未读的聊天信息
      ...
    leave-chats: []

  * _id: 'uid-2'
    username: '柏信'
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
    third-part-accounts:
      * type: 'weibo' # weibo | qq | ……
        api-url: 'http://weibo.com/api'
        account-name: '张三微博'
        token: 'TOKEN_FOR_AUTHENTICATION'
      ...

    # friendships history
    # 用于记录群组信息和查询未读群组消息
    # status说明:
    #   invited -- 被邀请状态，说明该群组向用户发起了邀请，且用户还没有阅读过该消息
    #   accepted -- 被接受状态，说明用户的加入群组申请被接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户的加入群组申请被拒绝，但用户还未得知该消息
    #   pending -- 待确认状态，说明用户的加入群组申请还在被审核中
    #   active -- 正常状态，说明用户已经加入该群组，并且用户已经确认过这个事实
    circles:
      * cid: 'cid-1'
        name: '@+小组'
        last-access-time: '2013-04-02 22:11:04'
        status: 'active' # invited | accepted | rejected | pending | active 其中除了pending和active状态，其他状态都会生成未读消息
      ...

    # 用于记录好友信息和查询未读好友消息
    # status说明:
    #   pending -- 待确认状态，说明用户发起的好友请求还没有被对方处理
    #   accepted -- 被接受状态，说明用户发起的好友请求已经被对方接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户发起的好友请求已经被对方拒绝，但用户还未得知该消息
    #   requested -- 被请求状态，说明对方对用户发起了好友请求，并且用户还未处理该请求
    #   inactive -- 被删除状态，说明对方已经将用户从好友中移除，但用户还未得知该消息
    #   active -- 正常状态，说明用户和对方已经是好友，而且已经确认过这个事实
    friends: # friends是双向的
      * name: '' # 默认未分组好友
        users:
          * uid: 'uid-1'
            status: 'active'
          ...
      * name: '大学同学' # 用户自定义分组
        users:
          * uid: 'uid-3'
            status: 'active' # pending | accepted | rejected | requested | inactive | active 其中除了pending和active状态，其他状态都会生成未读消息
          ...
      * name: '_weibo'
        users: ['昵称1', '昵称2']  # 用户在微博上的好友，下划线开头的，不是用户自定义的group，是系统分组
    # 用于记录关注用户信息和查询未读关注消息
    # status 说明：
    #   active -- 正常状态，说明用户已经确认过该粉丝
    #   pending -- 待确认状态，说明用户还未确认过该粉丝
    followers: # 关注我的人
      * uid: 'uid-3'
        status: 'active' # active | pending
      ...
    followings: ['uid-1', 'uid-2'] # 我关注的人
   
    # interesting point history
    # 用于记录关注的location记录和查询未读的兴趣点
    watching-locations:
      * lid: 'lid-1'
        last-access-time: '2013-10-23 10:11:11'
      ...
    # 用于记录创建、关注的兴趣点信息和查询未读会话
    created-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-points: ['ipid-7', 'ipid-8'] # 曾经关注，但是现在取消了的。用于恢复关注。
   
    # 用于记录创建、关注的兴趣点会话和查询未读评论
    created-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-point-sessions: ['ipsid-1', 'ipsid-2'] # 曾经关注，现在取消
   
    # 用于记录创建的评论和查询未读回复
    # 注意：因为我们没有获取用户创建评论的需求，因此这里有可能更改为 unread-replies
    created-comments:
      * cid: "mid-1"
        last-access-time: '2013-04-02 12:00:00' # 判断是否未读
      ...
   
    # 用于记录@到我的信息和查询未读@消息
    # status 说明:
    #   active -- 正常状态，说明被@到的用户已经阅读过该消息
    #   inactive -- 删除状态，说明信息源已经被删除
    #   pending -- 待确认状态，说明被@到的用户还没有阅读该消息
   
    mentioned-interesting-points: # 提到我的兴趣点
      * ipsid: "ipsid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-comments: # 提到我的评论
      * cid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-replies: # 提到我的回复
      * rid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
   
    # chats history
    # 用于生成聊天室未读消息
    # status说明：
    #   active -- 正常状态，说明用户已经加入到聊天室中，并且已经确认过该事实
    #   invited -- 被邀请状态，说明用户被邀请到该聊天室，但用户还没有处理该请求
    private-chats: []
   
    group-chats:
      * cid: 'cid-2'
        status: 'invited' # active | invited 其中invited状态会生成未读消息
        last-access-time: '2013-04-02 22:11:04' # 用于查询未读的聊天信息
      ... 
    leave-chats: [] # 曾经参加，但是现在退出

  * _id: 'uid-3'
    username: '王瑜'
    password: '123456' # sha1 加密之后
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
    third-part-accounts:
      * type: 'weibo' # weibo | qq | ……
        api-url: 'http://weibo.com/api'
        account-name: '张三微博'
        token: 'TOKEN_FOR_AUTHENTICATION'
      ...

    # friendships history
    # 用于记录群组信息和查询未读群组消息
    # status说明:
    #   invited -- 被邀请状态，说明该群组向用户发起了邀请，且用户还没有阅读过该消息
    #   accepted -- 被接受状态，说明用户的加入群组申请被接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户的加入群组申请被拒绝，但用户还未得知该消息
    #   pending -- 待确认状态，说明用户的加入群组申请还在被审核中
    #   active -- 正常状态，说明用户已经加入该群组，并且用户已经确认过这个事实
    circles:
      * cid: 'cid-1'
        name: '@+小组'
        last-access-time: '2013-04-02 22:11:04'
        status: 'invited' # invited | accepted | rejected | pending | active 其中除了pending和active状态，其他状态都会生成未读消息
      ...

    # 用于记录好友信息和查询未读好友消息
    # status说明:
    #   pending -- 待确认状态，说明用户发起的好友请求还没有被对方处理
    #   accepted -- 被接受状态，说明用户发起的好友请求已经被对方接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户发起的好友请求已经被对方拒绝，但用户还未得知该消息
    #   requested -- 被请求状态，说明对方对用户发起了好友请求，并且用户还未处理该请求
    #   inactive -- 被删除状态，说明对方已经将用户从好友中移除，但用户还未得知该消息
    #   active -- 正常状态，说明用户和对方已经是好友，而且已经确认过这个事实
    friends: # friends是双向的
      * name: '' # 默认未分组好友
        users: []
      ...
    followers: # 关注我的人
      * uid: 'uid-3'
        status: 'active' # active | pending
      ...
    followings: ['uid-1', 'uid-2'] # 我关注的人
   
    # interesting point history
    # 用于记录关注的location记录和查询未读的兴趣点
    watching-locations:
      * lid: 'lid-1'
        last-access-time: '2013-10-23 10:11:11'
      ...
    # 用于记录创建、关注的兴趣点信息和查询未读会话
    created-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-points: ['ipid-7', 'ipid-8'] # 曾经关注，但是现在取消了的。用于恢复关注。
   
    # 用于记录创建、关注的兴趣点会话和查询未读评论
    created-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-point-sessions: ['ipsid-1', 'ipsid-2'] # 曾经关注，现在取消
   
    # 用于记录创建的评论和查询未读回复
    # 注意：因为我们没有获取用户创建评论的需求，因此这里有可能更改为 unread-replies
    created-comments:
      * cid: "mid-1"
        last-access-time: '2013-04-02 12:00:00' # 判断是否未读
      ...
   
    # 用于记录@到我的信息和查询未读@消息
    # status 说明:
    #   active -- 正常状态，说明被@到的用户已经阅读过该消息
    #   inactive -- 删除状态，说明信息源已经被删除
    #   pending -- 待确认状态，说明被@到的用户还没有阅读该消息
   
    mentioned-interesting-points: # 提到我的兴趣点
      * ipsid: "ipsid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-comments: # 提到我的评论
      * cid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-replies: # 提到我的回复
      * rid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
   
    # chats history
    # 用于生成聊天室未读消息
    # status说明：
    #   active -- 正常状态，说明用户已经加入到聊天室中，并且已经确认过该事实
    #   invited -- 被邀请状态，说明用户被邀请到该聊天室，但用户还没有处理该请求
    private-chats: []
   
    group-chats:
      * cid: 'cid-2'
        status: 'invited' # active | invited 其中invited状态会生成未读消息
        last-access-time: '2013-04-02 22:11:04' # 用于查询未读的聊天信息
      ...
    leave-chats: []

  * _id: 'uid-4'
    username: '伟科'
    password: '123456' # sha1 加密之后
    gender: 'F' # M | F | U (不确定)
    emails: # emails[0]为主email
      'weike@some.com'
      ...
    avatars: # avatars[0]是当前使用的。
      '/avatars/u/uid/1' # u开头是用户上传的，资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/u/uid/1' # 资源为：http://at-plus-server/avatars/u/uid/2
      '/avatars/s/1'     # s开头是系统提供的资源为：http://at-plus-server/avatars/s/1
    signatures: # signatures[0]为当前使用的
      '彪悍的人生不需要解释'
      ...
    third-part-accounts:
      * type: 'weibo' # weibo | qq | ……
        api-url: 'http://weibo.com/api'
        account-name: '张三微博'
        token: 'TOKEN_FOR_AUTHENTICATION'
      ...

    # friendships history
    # 用于记录群组信息和查询未读群组消息
    # status说明:
    #   invited -- 被邀请状态，说明该群组向用户发起了邀请，且用户还没有阅读过该消息
    #   accepted -- 被接受状态，说明用户的加入群组申请被接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户的加入群组申请被拒绝，但用户还未得知该消息
    #   pending -- 待确认状态，说明用户的加入群组申请还在被审核中
    #   active -- 正常状态，说明用户已经加入该群组，并且用户已经确认过这个事实
    circles:
      * cid: 'cid-1'
        name: '@+小组'
        last-access-time: '2013-04-02 22:11:04'
        status: 'invited' # invited | accepted | rejected | pending | active 其中除了pending和active状态，其他状态都会生成未读消息
      ...

    # 用于记录好友信息和查询未读好友消息
    # status说明:
    #   pending -- 待确认状态，说明用户发起的好友请求还没有被对方处理
    #   accepted -- 被接受状态，说明用户发起的好友请求已经被对方接受，但用户还未得知该消息
    #   rejected -- 被拒绝状态，说明用户发起的好友请求已经被对方拒绝，但用户还未得知该消息
    #   requested -- 被请求状态，说明对方对用户发起了好友请求，并且用户还未处理该请求
    #   inactive -- 被删除状态，说明对方已经将用户从好友中移除，但用户还未得知该消息
    #   active -- 正常状态，说明用户和对方已经是好友，而且已经确认过这个事实
    friends: # friends是双向的
      * name: '' # 默认未分组好友
        users: 
          * uid: 'uid-2'
            status: 'active'
          * uid: 'uid-4'
            status: 'pending'
          ...
      * name: '大学同学' # 用户自定义分组
        users:
          * uid: 'uid-5'
            status: 'active' # pending | accepted | rejected | requested | inactive | active 其中除了pending和active状态，其他状态都会生成未读消息
          ...
      * name: '_weibo'
        users: []  # 用户在微博上的好友，下划线开头的，不是用户自定义的group，是系统分组
    # 用于记录关注用户信息和查询未读关注消息
    # status 说明：
    #   active -- 正常状态，说明用户已经确认过该粉丝
    #   pending -- 待确认状态，说明用户还未确认过该粉丝
    followers: # 关注我的人
      * uid: 'uid-3'
        status: 'active' # active | pending
      ...
    followings: ['uid-1', 'uid-2'] # 我关注的人
   
    # interesting point history
    # 用于记录关注的location记录和查询未读的兴趣点
    watching-locations:
      * lid: 'lid-1'
        last-access-time: '2013-10-23 10:11:11'
      ...
    # 用于记录创建、关注的兴趣点信息和查询未读会话
    created-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-points:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-points: ['ipid-7', 'ipid-8'] # 曾经关注，但是现在取消了的。用于恢复关注。
   
    # 用于记录创建、关注的兴趣点会话和查询未读评论
    created-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    watching-interesting-point-sessions:
      * ipid: "ipid-1"
        last-access-time: '2013-10-22 10:14:00'
      ...
    unwatching-interesting-point-sessions: ['ipsid-1', 'ipsid-2'] # 曾经关注，现在取消
   
    # 用于记录创建的评论和查询未读回复
    # 注意：因为我们没有获取用户创建评论的需求，因此这里有可能更改为 unread-replies
    created-comments:
      * cid: "mid-1"
        last-access-time: '2013-04-02 12:00:00' # 判断是否未读
      ...
   
    # 用于记录@到我的信息和查询未读@消息
    # status 说明:
    #   active -- 正常状态，说明被@到的用户已经阅读过该消息
    #   inactive -- 删除状态，说明信息源已经被删除
    #   pending -- 待确认状态，说明被@到的用户还没有阅读该消息
   
    mentioned-interesting-points: # 提到我的兴趣点
      * ipsid: "ipsid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-comments: # 提到我的评论
      * cid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
    mentioned-replies: # 提到我的回复
      * rid: "mid-1"
        status: 'active'# active | inactive | pending
      ...
   
    # chats history
    # 用于生成聊天室未读消息
    # status说明：
    #   active -- 正常状态，说明用户已经加入到聊天室中，并且已经确认过该事实
    #   invited -- 被邀请状态，说明用户被邀请到该聊天室，但用户还没有处理该请求
    private-chats: []
   
    group-chats: []
    leave-chats: []


  ...
