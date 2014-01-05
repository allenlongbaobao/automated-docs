request-remove-interesting-point-sessions =
  ipsids: ['ipsid-1', 'ipsid-2']
response-remove-interesting-point-sessions =
  result: "success"
  errors: []
remove-interesting-point-sessions-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsids:
      description: '要删除的兴趣点会话id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '兴趣点会话id'
        type: 'string'
