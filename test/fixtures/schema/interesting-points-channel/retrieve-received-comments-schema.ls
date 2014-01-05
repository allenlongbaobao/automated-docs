retrieve-received-comments-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '列表类型'
      type: 'string'
      enum: ['all', 'watching', 'created']
      default: 'all'
      required: false
    limit:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false
    skip:
      description: '查询偏移量'
      type: 'number'
      default: 0
      required: false
    from:
      description: '消息发送者的id'
      type: 'string'
      required: false
    unread:
      description: '是否只返回未读'
      type: 'boolean'
      default: false
      required: false