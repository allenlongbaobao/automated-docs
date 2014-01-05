request-retrieve-attended-users =
  type: 'interesting-point' # interesting-point | interesting-point-session
  id: 'xxxx'
  offset: 1
  count: 10
response-retrieve-attended-users =
  result: "success"
  errors: []
  users:
    * _id: 'xxxx'
      username: '张三'
      gender: 'F'
      email: 'zhangsan@gmail.com'
      avatars: 'avatars/u/uid/1'
      signatures: '我是张三'
    ...
retrieve-attended-users-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '查询类型'
      type: 'string'
      enum: ['interesting-point', 'interesting-point-session']
      required: true
    id:
      description: '查询的兴趣点或者会话id'
      type: 'string'
      required: true
    offset: 
      description: '查询对象的偏移量'
      type: 'number'
      default: 1
    count:
      description: '查询返回的数量'
      type: 'number'
      default: 10
