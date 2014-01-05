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
