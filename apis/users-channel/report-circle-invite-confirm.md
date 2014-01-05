request-report-circle-invite-confirm =
  cid: 'cid-1'
# 成功
response-report-circle-invite-confirm =
  result: 'success'
  errors: []
report-circle-invite-confirm-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '群组id'
      type: 'string'
      required: true
