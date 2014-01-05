# this is this is req

h2 this is req

code:
    request-update-status =
  status: 'online' # online | offline | invisible


# this is this is req

h2 this is req

code:
    response-update-status =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:
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


