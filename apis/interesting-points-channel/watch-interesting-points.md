# this is this is req

h2 this is req

code:

     request-watch-interesting-points =
  ipids: ['ipid-1', 'ipid-2']


# this is this is req

h2 this is req

code:

     response-watch-interesting-points =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:

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


