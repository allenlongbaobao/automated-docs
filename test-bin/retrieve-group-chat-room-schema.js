(function(){
  var retrieveGroupChatRoomSchema;
  retrieveGroupChatRoomSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        type: 'string',
        required: true,
        description: '聊天室id'
      }
    }
  };
}).call(this);
