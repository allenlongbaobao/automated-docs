# this is this is req

h2 this is req

code:

     request-watch-locations =
  lids: ['lid-1', 'lid-2']


# this is this is req

h2 this is req

code:

     response-watch-locations =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

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


