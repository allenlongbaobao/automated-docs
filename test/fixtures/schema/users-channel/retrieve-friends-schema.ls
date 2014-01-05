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
