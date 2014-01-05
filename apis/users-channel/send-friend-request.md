# this is this is req

h2 this is req

code:
    request-send-friend-request =
  uid: 'uid-1'
  



# this is this is req

h2 this is req

code:
    response-send-friend-request =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:
    send-friend-request-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户ObjectId'
      type: 'string'
      required: true


