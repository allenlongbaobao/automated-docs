request-send-circle-invite =
  uids: ['uid-1', 'uid-2']
response-send-circle-invite =
  result: 'success'
  errors: []
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
