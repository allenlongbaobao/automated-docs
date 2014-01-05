retrieve-received-replies-schema =
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
      description: '消息发送者的id'
      type: 'sring'
      required: false
    unread:
      description: '是否只返回未读'
      type: 'boolean'
      default: false
      required: false
