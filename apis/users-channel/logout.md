# this is this is req

h2 this is req

code:

     request-logout = {}


# this is this is req

h2 this is req

code:

     response-logout =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:

     logout-schema =
  type: 'object'
  additional-properties: false
  properties:
    token:
      description: '用户在主站退出后返回的标识'
      type: 'string'
      required: true


