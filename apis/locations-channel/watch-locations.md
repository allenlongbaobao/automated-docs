request-watch-locations =
  lids: ['lid-1', 'lid-2']
response-watch-locations =
  result: "success"
  errors: []
watch-locations-schema =
  type: 'object'
  additional-properties: false
  properties:
    lids:
      description: '关注的location的id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: 'location的id'
        type: 'string'
