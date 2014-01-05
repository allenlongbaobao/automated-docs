request-handle-circle-apply =
  type: 'accepted' # rejeceted
  uid: 'uid-1'
  cid: 'cid-1'
# 成功
response-handle-circle-apply =
  result: 'success'
  errors: []
  accepted-user:
    _id: 'uid-1'
    username: 'Shin'
    gender: 'M'
    email: 'bossonchan@gmail.com'
    avatar: '/avatars/u/uid-1/1'
    signature: '@+ is awesome!!'
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
