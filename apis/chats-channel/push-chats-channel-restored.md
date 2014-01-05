# this is this is req

h2 this is req

code:

     response-push-chats-channel-restored =
  private-chats:
    * _id: 'cid-1'
      uid: 'uid-1'
      name: '小东'
      signature: '彪悍的人生不需要解释'
      avatar: '/avatars/u/uid-1/'
      unread-chat-messages-count: 1
    ...

  group-chats: # 目前参与的群聊
    * _id: 'cid-1'
      status: 'active' # 'invited'
      name: '聊天室1'
      signature: '伟科号帅气的哦'
      members-count: 10
      unread-chat-messages-count: 20 # 未读消息数，前端自己生成未读消息
    ... 

  leave-chats: ['cid-2', 'cid-3'] # 离开的聊天室，可以让用户恢复


