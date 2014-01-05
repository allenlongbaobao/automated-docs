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
