request-update-profile =
  username: 'Shin'
  gender: 'M' # F | M | U
  email: 'bossonchan@gmail.com'
  avatar: '/avatars/u/uid-1/xxxx'
  signature: '@+ is awesome!!'
response-update-profile =
  result: 'success'
  errors: []
# JSON Schema
update-profile-schema =
  type: 'object'
  additional-properties: false
  properties:
    username:
      description: '用户名'
      type: 'string'
      required: true
    gender: 
      description: '用户性别'
      type: 'string'
      enum: ['M', 'F', 'U']
      required: true
    email:
      description: '用户邮箱地址'
      type: 'string'
      required: true
    avatar:
      description: '用户头像地址'
      type: 'string'
      required: true
    signature: 
      description: '用户个性签名'
      type: 'string'
      required: true
