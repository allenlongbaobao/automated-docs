# 注意！！！！
# 如果没有登录，不会返回任何数据！！
chats-channel-response-initial =
  private-chats: # 目前参与的私聊
    * _id: 'cid-1'
      uid: 'uid-1'
      name: '小东'
      signature: '彪悍的人生不需要解释'
      avatar: '/avatars/u/uid-1/'
      unread-chat-messages-count: 1
      unread-system-chat-messages:
        * _id: 'mid-1'
          cid: 'cid-1'
          type: 'chat-msg' # 系统消息也是message的一种
          behavior: 'create' # leave, open, invite 这里的类型指的是系统消息的具体分类, 包括私聊中创建讨论组， 讨论组中邀请用户, 用户离开讨论组, 聊天室已存在
          text-content: '小东接收了邀请'
          related-users: # 相关用户指 用户接收邀请, 拒绝邀请,离开讨论组的动作主体 和 用户邀请的对象
            * _id: 'uid-1'
              username: '小东'
              signature: ''
              avatar: '/avatars/u/uid/1'
            ...
          sender: # 发送者, behavior为invited中, 邀请的发起者信息
            _id: 'uid-2'
            username: '柏信'
            signature: ''
            avatar: '/avatars/u/uid/2'
            create-time: '2012-12-11 12:00:00'
        ...
    ...
  group-chats: # 目前参与的群聊
    * _id: 'cid-1'
      name: '聊天室1'
      signature: '伟科号帅气的哦'
      members-count: 10
      unread-chat-messages-count: 20 # 未读消息数，前端自己生成未读消息
      unread-system-chat-messages:
        * _id: 'mid-1'
          cid: 'cid-1'
          type: 'chat-msg' # 系统消息也是message的一种
          behavior: 'create' # leave, open, invite 这里的类型指的是系统消息的具体分类, 包括私聊中创建讨论组， 讨论组中邀请用户, 用户离开讨论组, 聊天室已存在
          text-content: '小东接收了邀请'
          related-users: # 相关用户指 用户接收邀请, 拒绝邀请,离开讨论组的动作主体 和 用户邀请的对象
            * _id: 'uid-1'
              username: '小东'
              signature: ''
              avatar: '/avatars/u/uid/1'
            ...
          sender: # 发送者, behavior为invited中, 邀请的发起者信息
            _id: 'uid-2'
            username: '柏信'
            signature: ''
            avatar: '/avatars/u/uid/2'
            create-time: '2012-12-11 12:00:00'
        ...
    ... 
  leave-chats: ['cid-2', 'cid-3'] # 离开的聊天室，可以让用户恢复
