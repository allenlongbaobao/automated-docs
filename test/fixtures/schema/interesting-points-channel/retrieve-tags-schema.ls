retrieve-tags-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '兴趣点id'
      type: 'string'
      required: true
    offset:
      description: '查询对象的偏移量'
      type: 'number'
      default: 0
    count:
      description: '查询返回的数量'
      type: 'number'
      default: 10
