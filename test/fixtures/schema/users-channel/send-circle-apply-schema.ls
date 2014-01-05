send-circle-apply-schema =
  type: 'object'
  additional-properties: false
  properties:
    cids:
      description: '群组id数组'
      type: 'array'
      required: true
      items:
        type: 'string'
