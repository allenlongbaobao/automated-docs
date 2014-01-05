# this is this is req

h2 this is req

code:

     response-push-new-chat-message =
  _id: 'mid-1'
  type: 'chat-msg' # 聊天室类型
  push-type: 'personal-msg'
  chat-type: 'private-chat'
  cid: 'cid-1' # 聊天室id
  original-content-type: 'text' # 文字和语音可能会互相转化，因此这里给出原本用户创建的消息类型
  text-content: '你好@Shin'
  voice-content: '/voice-message/cid-1/xxxxx'
  at-users: ['uid-1'] # 若@到的用户不在群组内，那么会将向该用户发送加入聊天室申请
  create-time: '2013-02-01 12:02:12'
  send-by-me: false # false | true 一般来讲，推送过来的聊天消息都不是用户发的
  send-by:
    _id: 'uid-1'
    username: '小东'
    signature: ''
    avatar: '/avatars/u/uid/1'


