# this is this is req

h2 this is req

code:
    request-add-tags =
  ipid: 'ipid-1'
  tags: ['SYSU', '中大']


# this is this is req

h2 this is req

code:
    response-add-tags =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:
    add-tags-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '兴趣点id'
      type: 'string'
      required: true
    tags:
      description: '新增标签数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '标签名'
        type: 'string'


