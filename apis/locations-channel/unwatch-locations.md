# this is this is req

h2 this is req

code:
    request-unwatch-locations =
  lids: ['lid-1']


# this is this is req

h2 this is req

code:
    response-unwatch-locations =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:
    unwatch-locations-schema =
  type: 'object'
  additional-properties: false
  properties:
    lids:
      description: '要取消关注的location的id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: 'location的id'
        type: 'string'

