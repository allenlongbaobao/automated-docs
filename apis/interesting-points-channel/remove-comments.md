# this is this is req

h2 this is req

code:

     request-remove-comments =
  cids: ['mid-1']


# this is this is req

h2 this is req

code:

     response-remove-comments =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

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


