# this is this is req

h2 this is req

code:

     request-retrieve-profile =
  uid: 'xxxxxx'


# this is this is req

h2 this is req

code:

     response-retrieve-profile =
  result: 'success'
  errors: []
  user:
    _id: 'xxxxxx'
    username: 'Shin'
    email: 'bossonchan@gmail.com'
    avatar: '/avatars/u/uid-1/2'
    signature: '@+ is awesome!!'



# this is this is req

h2 this is req

code:

     # JSON Schema
retrieve-profile-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户ObjectId'
      type: 'string'
      required: true


