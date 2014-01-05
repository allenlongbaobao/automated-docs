watch-interesting-point-sessions-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsids:
      description: '关注的兴趣点会话id数组'
      type: 'array'
      min-items: 1
      required: true
      items:
        type: 'string'
        description: '兴趣点会话id'
