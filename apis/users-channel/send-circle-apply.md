request-send-circle-apply =
  cids: ['cid-1', 'cid-2']
# 成功
response-send-circle-apply =
  result: 'success'
  errors: []
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
