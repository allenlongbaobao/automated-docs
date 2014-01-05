# JSON Schema
retrieve-chat-room-members-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    offset:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
      required: false
    count:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false
