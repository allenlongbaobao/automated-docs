# this is this is req

h2 this is req

code:
    request-retrieve-active-users =
  url: 'http://www.some.com'
  lid: 'lid-1'


# this is this is req

h2 this is req

code:
    response-retrieve-active-users =
  result: "success"
  errors: []
  users:
    * _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      avatar: 'http://222.200.185.66:8002/avatars/s/50/0'
      signature: '@+ is awesome!'
      email: 'bossonchan@gmail.com'
    ...


# this is this is req

h2 this is req

code:
    retrieve-active-users-schema =
  type: 'object'
  additional-properties: false
  properties:
    url:
      description: '����location��Ӧ��url'
      type: 'string'
      required: true
    lid:
      description: '����location��Ӧ��id'
      type: 'string'
      required: true


