(function(){
  var createAGroupChatRoomSchema;
  createAGroupChatRoomSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      initialMembers: {
        description: '新建聊天室时的初始化成员',
        type: 'array',
        minItems: 1,
        maxItems: 20,
        items: {
          type: 'string'
        },
        required: true
      },
      name: {
        description: '聊天室名字',
        type: 'string',
        required: true
      },
      signature: {
        description: '聊天室签名',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
