request-update-chat-room-name-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    name:
      description: '修改后的名称'
      type: 'string'
      required: true
