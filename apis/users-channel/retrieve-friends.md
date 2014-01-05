request-retrieve-friends =
  offset: 1
  count: 20
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
