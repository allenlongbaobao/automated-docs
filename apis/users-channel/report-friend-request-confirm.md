request-report-friend-request-confirm =
  uid: 'uid-1'
# 成功
response-report-friend-request-confirm =
  result: 'success'
  errors: []
report-friend-request-confirm-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户id'
      type: 'string'
      required: true
