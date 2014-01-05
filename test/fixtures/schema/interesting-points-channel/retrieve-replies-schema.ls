retrieve-replies-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '评论id'
      type: 'string'
      required: true
    last-access-time:
      description: '最后访问时间，用于查询最新、未读的记录'
      type: 'string'
      default: ''
    skip:
      description: '查询对象的偏移量'
      type: 'number'
      default: 0
    limit:
      description: '查询返回的数量'
      type: 'number'
      default: 10
    sort:
      description: '时间排序方式'
      type: 'number'
      default: 1
