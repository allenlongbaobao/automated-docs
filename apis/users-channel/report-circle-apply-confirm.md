request-report-circle-apply-confirm =
  cid: 'cid-1'

# 成功
response-report-circle-apply-confirm =
  result: 'success'
  errors: []

report-circle-apply-confirm-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '群组的id'
      type: 'string'
      required: true
