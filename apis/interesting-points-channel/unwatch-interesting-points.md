# this is this is req

h2 this is req

code:

     request-unwatch-interesting-points =
  ipids: ['ipid-1']


# this is this is req

h2 this is req

code:

     response-unwatch-interesting-points =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

     unwatch-interesting-points-schema =
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


