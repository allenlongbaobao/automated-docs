# this is this is req

h2 this is req

code:
    request-send-circle-invite =
  uids: ['uid-1', 'uid-2']


# this is this is req

h2 this is req

code:
    response-send-circle-invite =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:
    send-circle-invite-schema =
  type: 'object'
  additional-properties: false
  properties:
    uids:
      description: '用户id数组'
      type: 'array'
      required: true
      items:
        type: 'string'


