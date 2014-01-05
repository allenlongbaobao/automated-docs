# this is this is req

h2 this is req

code:

     request-close-interesting-point-and-session =
  ipid: 'ipid-1'
  ipsid: 'ipsid-1'


# this is this is req

h2 this is req

code:

     response-close-interesting-point =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

     close-interesting-point-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '要关闭的兴趣点id'
      type: 'string'
      required: true
    ipsid:
      description: '要关闭兴趣点会话id'
      type: 'string'
      required: true


