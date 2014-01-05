# 获取第11 - 20 条历史消息
request-retrieve-chat-history =
  cid: 'cid-1'
  skip: 10
  limit: 10
response-retrieve-chat-history =
  result: 'success'
  errors: []
  chat-messages: # 实际上这里直接返回html片段可能更好一点，不过需要跟前端商量具体格式，这里还是先给出历史记录的基本信息
    * _id: 'mid-1'
      type: 'chat-msg'
      push-type: 'personal-msg'
      chat-type: 'private-chat'
      cid: 'cid-1'
      original-content-type: 'text'
      text-content: '召唤@Shin 赶紧出现！！'
      voice-content: '/voice-message/cid-1/xxxx'
      at-users: ['uid-1', 'uid-2', 'uid-3']
      create-time: '2012-02-02 03:02:02'
      send-by-me: false
      send-by: 'uid-1'
    ...
retrieve-chat-history-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    reference-time:
      description: '查询对象基准时间'
      type: 'string'
      default: 1
      required: false
    limit:
      description: '查询对象数量'
      type: 'number'
      default: 10
      required: false
