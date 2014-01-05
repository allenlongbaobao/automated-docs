# this is this is req

h2 this is req

code:

     request-leave-circles =
  cids: ['cid-1', 'cid-2']


# this is this is req

h2 this is req

code:

     # 成功
response-leave-circles =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:

     leave-circles-schema =
  type: 'object'
  additional-properties: false
  properties:
    cids:
      description: '离开的群组id数组'
      type: 'array'
      required: true
      items:
        type: 'string'


