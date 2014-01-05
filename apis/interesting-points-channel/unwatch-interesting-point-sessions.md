request-unwatch-interesting-point-sessions =
  ipsids: ['ipsid-1']
response-unwatch-interesting-point-sessions =
  result: "success"
  errors: []
unwatch-interesting-point-sessions-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsids:
      description: '关注的兴趣点会话id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '兴趣点会话id'
        type: 'string'
