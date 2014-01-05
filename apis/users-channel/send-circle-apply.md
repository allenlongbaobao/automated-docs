# this is this is req

h2 this is req

code:
    request-send-circle-apply =
  cids: ['cid-1', 'cid-2']


# this is this is req

h2 this is req

code:
    # 成功
response-send-circle-apply =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:
    send-circle-apply-schema =
  type: 'object'
  additional-properties: false
  properties:
    cids:
      description: '群组id数组'
      type: 'array'
      required: true
      items:
        type: 'string'


