request-send-friend-request =
  uid: 'uid-1'
  

response-send-friend-request =
  result: "success"
  errors: []
send-friend-request-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户ObjectId'
      type: 'string'
      required: true
