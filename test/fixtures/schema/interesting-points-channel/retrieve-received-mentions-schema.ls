retrieve-received-mentions-schema =
  type: 'object'
  additional-properties: false
  properties:
    skip:
      description: '查询偏移量'
      type: 'number'
      default: 0
      required: false
    limit:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false
    from:
      description: '消息发送者的id，为空时表示所有用户'
      type: 'string'
      required: false
    type:
      description: '@的类型'
      type: 'string'
      enum: ['all', 'interesting-point', 'comment', 'reply']
      default: 'all'
      required: false
    unread:
      description: '是否只获取未读的消息'
      type: 'boolean'
      default: false
      required: false
