remove-replies-schema =
  type: 'object'
  additional-properties: false
  properties:
    rids:
      description: '要删除的回复id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        type: 'string'
        description: '回复id'
