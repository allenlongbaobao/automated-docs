# this is this is req

h2 this is req

code:

     request-open-interesting-point =
  ipid: 'ipid-1'
  ipsid: 'ipsid-1'


# this is this is req

h2 this is req

code:

     response-open-interesting-point =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

     open-interesting-point-schema  =
  type: 'object'
  additional-properties: false
  properties: 
    ipid: 
      description: '打开的兴趣点id'
      type: 'string'
      required: true
    ipsid:
      description: '正在浏览的会话id'
      type: 'string'
      required: true


