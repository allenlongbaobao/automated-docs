# this is this is req

h2 this is req

code:

     request-retrieve-circle-members =
  cid: 'cid-1'
  offset: 1
  count: 10


# this is this is req

h2 this is req

code:

     # 成功
response-retrieve-circle-members =
  result: 'success'
  errors: []
  members:
    * _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1/1'
      signature: '@+ is awesome!!'
      status: 'online' # 'offline'
    ...


# this is this is req

h2 this is req

code:

     retrieve-circle-members-schema = 
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '查询的群组id'
      type: 'string'
      required: true
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


