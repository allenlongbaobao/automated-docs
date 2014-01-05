request-update-status =
  status: 'online' # online | offline | invisible
response-update-status =
  result: 'success'
  errors: []
# JSON Schema
update-status-schema =
  type: 'object'
  additional-properties: false
  properties:
    status:
      description: '用户状态'
      type: 'string'
      enum: ['online', 'offline', 'invisible']
      required: true
