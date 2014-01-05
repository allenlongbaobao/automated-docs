# this is this is req

h2 this is req

code:

     request-unwatch-interesting-point-sessions =
  ipsids: ['ipsid-1']


# this is this is req

h2 this is req

code:

     response-unwatch-interesting-point-sessions =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

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


