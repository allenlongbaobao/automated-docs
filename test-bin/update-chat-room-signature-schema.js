(function(){
  var requestUpdateChatRoomSignatureSchema;
  requestUpdateChatRoomSignatureSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '聊天室id',
        type: 'string',
        required: true
      },
      signature: {
        description: '修改后的签名',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
