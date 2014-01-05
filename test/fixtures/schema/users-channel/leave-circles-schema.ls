leave-circles-schema =
  type: 'object'
  additional-properties: false
  properties:
    cids:
      description: '离开的群组id数组'
      type: 'array'
      required: true
      items:
        type: 'string'
