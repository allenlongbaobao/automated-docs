# this is this is req

h2 this is req

code:
    request-retrieve-chat-room-members =
  cid: 'cid-1' # 聊天室id
  offset: 1  # 查询对象偏移量
  count: 10  # 查询数量


# this is this is req

h2 this is req

code:
    response-retrieve-chat-room-members =
  result: 'success'
  errors: []
  members:
    * _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1/2'
      signature: '@+ is awesome!!'
    ...


# this is this is req

h2 this is req

code:
    # JSON Schema
retrieve-chat-room-members-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    offset:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
      required: false
    count:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false


