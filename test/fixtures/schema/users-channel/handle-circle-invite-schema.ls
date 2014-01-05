handle-circle-invite-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '处理类型'
      type: 'string'
      enum: ['accepted', 'rejected']
      required: true
    cid:
      description: '群组id'
      type: 'string'
      required: true
