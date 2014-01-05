retrieve-watching-users-schema =
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
      type: 'string'
      default: 1
    count:
      description: '查询返回的数量'
      type: 'number'
      default: 10
