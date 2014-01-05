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
