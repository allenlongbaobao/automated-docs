request-report-friend-updated =
  uid: 'uid-1'
# 成功
response-report-friend-updated =
  result: 'success'
  errors: []
report-friend-updated-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户id'
      type: 'string'
      required: true
