# this is this is req

h2 this is req

code:

     send-group-chat-message-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室的ObjectId'
      type: 'string'
      required: true
    original-content-type:
      description: '聊天消息的原生内容类型'
      type: 'string'
      enum: ['voice', 'text']
      required: true
    text-content:
      description: '文字消息的内容'
      type: 'string'
      required: true
    voice-content:
      description: '语音消息的链接地址'
      type: 'string'
      required: true


