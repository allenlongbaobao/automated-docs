request-remove-friends =
  uids: ['uid-1', 'uid-2']
# 成功
response-remove-friends =
  result: 'success'
  errors: []
remove-friends-schema =
  type: 'object'
  additional-properties: false
  properties:
    uids:
      description: '用户id数组'
      type: 'array'
      required: true
      items:
        type: 'string'
