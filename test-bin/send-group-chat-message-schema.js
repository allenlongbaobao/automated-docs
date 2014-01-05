(function(){
  var sendGroupChatMessageSchema;
  sendGroupChatMessageSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '聊天室的ObjectId',
        type: 'string',
        required: true
      },
      originalContentType: {
        description: '聊天消息的原生内容类型',
        type: 'string',
        'enum': ['voice', 'text'],
        required: true
      },
      textContent: {
        description: '文字消息的内容',
        type: 'string',
        required: true
      },
      voiceContent: {
        description: '语音消息的链接地址',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
