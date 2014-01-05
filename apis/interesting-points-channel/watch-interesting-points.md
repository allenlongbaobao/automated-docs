request-watch-interesting-points =
  ipids: ['ipid-1', 'ipid-2']
response-watch-interesting-points =
  result: 'success'
  errors: []
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
