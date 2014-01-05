handle-friend-request-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '处理类型'
      type: 'string'
      enum: ['accepted', 'rejected']
      required: true
    uid:
      description: '用户id'
      type: 'string'
      required: true
