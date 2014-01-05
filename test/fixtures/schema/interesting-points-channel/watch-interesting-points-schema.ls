watch-interesting-points-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipids:
      description: '关注的兴趣点id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '兴趣点id'
        type: 'string'
