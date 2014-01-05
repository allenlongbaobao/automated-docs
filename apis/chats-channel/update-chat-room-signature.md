# this is this is req

h2 this is req

code:
    request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'


# this is this is req

h2 this is req

code:
    # 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:
    request-update-chat-room-signature-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    signature:
      description: '修改后的签名'
      type: 'string'
      required: true


