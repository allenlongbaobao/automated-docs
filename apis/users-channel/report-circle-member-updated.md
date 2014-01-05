request-report-circle-member-updated =
  cid: 'cid-1'
# 成功
response-report-circle-member-updated =
  result: 'success'
  errors: []
report-circle-member-updated-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '更新的群组id'
      type: 'string'
      required: true
