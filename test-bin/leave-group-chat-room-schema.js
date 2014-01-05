(function(){
  var leaveChatRoomsSchema;
  leaveChatRoomsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '离开的聊天室id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
