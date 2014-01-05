# this is this is req

h2 this is req

code:

     request-watch-interesting-point-sessions =
  ipsids: ['ipsid-1', 'ipsid-2']


# this is this is req

h2 this is req

code:

     response-watch-interesting-point-sessions =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:

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


