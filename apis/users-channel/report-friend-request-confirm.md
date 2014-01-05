# this is this is req

h2 this is req

code:

     request-report-friend-request-confirm =
  uid: 'uid-1'


# this is this is req

h2 this is req

code:

     # 成功
response-report-friend-request-confirm =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:

     report-friend-request-confirm-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户id'
      type: 'string'
      required: true


