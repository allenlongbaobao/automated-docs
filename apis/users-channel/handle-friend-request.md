# this is this is req

h2 this is req

code:
    request-handle-friend-request =
  type: 'accepted' # rejected
  uid: 'uid-1'


# this is this is req

h2 this is req

code:
    # 成功
response-handle-friend-request =
  result: 'success'
  errors: []
  new-friend: # 仅当accepted时出现
    _id: 'uid-1'
    username: 'Shin'
    gender: 'M'
    email: 'bossonchan@gmail.com'
    avatar: '/avatars/u/uid-1/1'
    signature: '@+ is awesome!!'
    status: 'online' # 'offline'


# this is this is req

h2 this is req

code:
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


