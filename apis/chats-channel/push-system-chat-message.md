# this is this is req

h2 this is req

code:

     response-push-system-chat-message =  
  cid: 'cid-1' 
  message: 
    _id: 'mid-1'
    type: 'chat-msg' # 系统消息也是message的一种
    push-type: 'system-msg'
    chat-type: 'private-chat'
    behavior: 'accepted' # rejected, invited, existed, left 这里的类型指的是系统消息的具体分类, 包括 用户邀请, 用户接收邀请, 用户拒绝邀请, 用户离开讨论组, 聊天室已存在
    text-content: '小东接收了邀请'
    related-user: # 相关用户指 用户接收邀请, 拒绝邀请,离开讨论组的动作主体 和 用户邀请的对象
      * uid: 'uid-1'
        username: '小东'
        signature: ''
        avatar: '/avatars/u/uid/1'
      ...
    sender: # 发送者, behavior为invited中, 邀请的发起者信息
      uid: 'uid-2'
      username: '柏信'
      signature: ''
      avatar: '/avatars/u/uid/2'
    create-time: '2012-12-11 12:00:00'


