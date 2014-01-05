request-retrieve-profile =
  uid: 'xxxxxx'
response-retrieve-profile =
  result: 'success'
  errors: []
  user:
    _id: 'xxxxxx'
    username: 'Shin'
    email: 'bossonchan@gmail.com'
    avatar: '/avatars/u/uid-1/2'
    signature: '@+ is awesome!!'

# JSON Schema
retrieve-profile-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户ObjectId'
      type: 'string'
      required: true
