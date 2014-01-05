# this is this is req

h2 this is req

code:

     request-handle-circle-invite =
  type: 'accepted' # rejected
  cid: 'cid-1'


# this is this is req

h2 this is req

code:

     # 成功
response-handle-circle-invite =
  result: 'success'
  errors: []
  new-circle: # 当accepted时才出现的属性
    _id: 'cid-1'
    name: '@+ 小组'
    members-count: 100


# this is this is req

h2 this is req

code:

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


