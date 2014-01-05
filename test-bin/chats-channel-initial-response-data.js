(function(){
  var chatsChannelResponseInitial;
  chatsChannelResponseInitial = {
    privateChats: [{
      _id: 'cid-1',
      uid: 'uid-1',
      name: '小东',
      signature: '彪悍的人生不需要解释',
      avatar: '/avatars/u/uid-1/',
      unreadChatMessagesCount: 1,
      unreadSystemChatMessages: [{
        _id: 'mid-1',
        cid: 'cid-1',
        type: 'chat-msg',
        behavior: 'create',
        textContent: '小东接收了邀请',
        relatedUsers: [{
          _id: 'uid-1',
          username: '小东',
          signature: '',
          avatar: '/avatars/u/uid/1'
        }],
        sender: {
          _id: 'uid-2',
          username: '柏信',
          signature: '',
          avatar: '/avatars/u/uid/2',
          createTime: '2012-12-11 12:00:00'
        }
      }]
    }],
    groupChats: [{
      _id: 'cid-1',
      name: '聊天室1',
      signature: '伟科号帅气的哦',
      membersCount: 10,
      unreadChatMessagesCount: 20,
      unreadSystemChatMessages: [{
        _id: 'mid-1',
        cid: 'cid-1',
        type: 'chat-msg',
        behavior: 'create',
        textContent: '小东接收了邀请',
        relatedUsers: [{
          _id: 'uid-1',
          username: '小东',
          signature: '',
          avatar: '/avatars/u/uid/1'
        }],
        sender: {
          _id: 'uid-2',
          username: '柏信',
          signature: '',
          avatar: '/avatars/u/uid/2',
          createTime: '2012-12-11 12:00:00'
        }
      }]
    }],
    leaveChats: ['cid-2', 'cid-3']
  };
}).call(this);
