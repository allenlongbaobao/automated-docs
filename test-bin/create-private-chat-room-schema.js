(function(){
  var createPrivateChatRoomSchema;
  createPrivateChatRoomSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      uid: {
        description: '聊天对象的uid',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
