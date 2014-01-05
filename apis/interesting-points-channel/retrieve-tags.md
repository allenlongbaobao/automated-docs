# this is this is req

h2 this is req

code:
    request-retrieve-tags =
  ipid: 'ipid-1'
  offset: 0
  count: 10


# this is this is req

h2 this is req

code:
    response-retrieve-tags =
  result: "success"
  errors: []
  tags: ['SYSU', '中大']



# this is this is req

h2 this is req

code:
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


