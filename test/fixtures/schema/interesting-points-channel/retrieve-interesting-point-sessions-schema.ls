retrieve-interesting-point-sessions-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '兴趣点id'
      type: 'string'
      required: true
    last-access-time:
      description: '最后访问时间，用于查询最新、未读记录'
      type: 'string'
      default: ''
    skip:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
    limit:
      description: '查询对象数量'
      type: 'number'
      default: 10
    sort:
      description: '时间排序方式'
      type: 'number'
      default: 1
