handle-circle-apply-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '处理类型'
      type: 'string'
      enum: ['accepted', 'rejected']
      required: true
    uid:
      description: '申请加入的用户id'
      type: 'string'
      required: true
    cid:
      description: '要申请加入的群组id'
      type: 'string'
      required: true
