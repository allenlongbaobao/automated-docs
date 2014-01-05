# this is this is req

h2 this is req

code:
    request-retrieve-friends =
  offset: 1
  count: 20


# this is this is req

h2 this is req

code:
    # 成功
response-retrieve-friends =
  result: 'success'
  errors: []
  users:
    * _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1/1'
      signature: '@+ is awesome!!'
      status: 'online'
    ...


# this is this is req

h2 this is req

code:
    retrieve-friends-schema =
  type: 'object'
  additional-properties: false
  properties:
    offset:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
      required: true
    count:
      description: '查询数量'
      type: 'number'
      default: 10
      required: true


