# this is this is req

h2 this is req

code:
    request-remove-interesting-point-sessions =
  ipsids: ['ipsid-1', 'ipsid-2']


# this is this is req

h2 this is req

code:
    response-remove-interesting-point-sessions =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:
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


