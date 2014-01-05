request-remove-comments =
  cids: ['mid-1']
response-remove-comments =
  result: "success"
  errors: []
remove-comments-schema =
  type: 'object'
  additional-properties: false
  properties:
    cids:
      description: '要删除的评论id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '评论id'
        type: 'string'
