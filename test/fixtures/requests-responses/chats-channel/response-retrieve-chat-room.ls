response-retrieve-chat-room =
  result: 'success' 
  errors: []  
  chat-room:  # 成功时才会返回的属性
    _id: 'cid-2'
    type: 'group-chat'
    name: '中大软院'
    signature: '软院是个好学院'
    members:
      * _id: 'uid-2'
        name: '小东'
        signature: '@+ is wonderful'
        avatar: '/avatars/u/uid-1'
        join-time: '2013-02-11 04:11:44'
      * _id: 'uid-3'
        name: '柏信'
        signature: '彪悍的人生不需要解释'
        avatar: '/avatars/u/uid-2'
        join-time: '2013-04-11 05:00:00'
      ...