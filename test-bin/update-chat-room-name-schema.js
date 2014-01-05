(function(){
  var requestUpdateChatRoomNameSchema;
  requestUpdateChatRoomNameSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '聊天室id',
        type: 'string',
        required: true
      },
      name: {
        description: '修改后的名称',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
