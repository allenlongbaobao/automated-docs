request-retrieve-likes =
  type: 'interesting-point' # interesting-point } interesting-point-session | comment | reply
  id: 'xxx'
  offset: 1
  count: 10
response-retrieve-likes =
  result: "success"
  errors: []
  users: 
    * _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/uid-1/2'
      signature: '@+ is awesome!!'
    ...
retrieve-likes-schema =
  type: 'object'
  additional-properties: false
  properties: 
    type:
      description: '查询类型'
      type: 'string'
      enum: ['interesting-point', 'interesting-point-session', 'comment', 'reply']
      required: true
    id:
      description: '兴趣点、会话、评论回复id'
      type: 'string'
      required: true
    offset:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
    count:
      description: '查询对象数量'
      type: 'number'
      default: 10
