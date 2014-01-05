# this is this is req

h2 this is req

code:

     request-retrieve-attended-users =
  url: 'http://www.some.com'
  lid: 'xxxx'


# this is this is req

h2 this is req

code:

     response-retrieve-attended-users =
  result: "success"
  errors: []
  users:
    * _id: 'uid-1'
      username: 'Bosson'
      signature: 'I am @+er'
      email: '791237291@qq.com'
      gender: 'U'
      avatar: 'http://222.200.185.66:8002/avatars/s/50/0'
    ...


# this is this is req

h2 this is req

code:

     retrieve-attended-users-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid:
      description: '所在location对应的id'
      type: 'string'
      required: true


