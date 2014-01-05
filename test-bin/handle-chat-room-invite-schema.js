(function(){
  var handleChatRoomInviteSchema;
  handleChatRoomInviteSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '聊天室id',
        type: 'string',
        required: true
      },
      type: {
        description: '处理结果',
        type: 'string',
        'enum': ['accepted', 'rejected'],
        required: true
      }
    }
  };
}).call(this);
