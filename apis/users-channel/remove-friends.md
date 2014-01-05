# this is this is req

h2 this is req

code:
    request-remove-friends =
  uids: ['uid-1', 'uid-2']


# this is this is req

h2 this is req

code:
    # 成功
response-remove-friends =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:
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


