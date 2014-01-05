(function(){
  var retrieveChatRoomMembersSchema;
  retrieveChatRoomMembersSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '聊天室id',
        type: 'string',
        required: true
      },
      offset: {
        description: '查询对象偏移量',
        type: 'number',
        'default': 1,
        required: false
      },
      count: {
        description: '查询数量',
        type: 'number',
        'default': 10,
        required: false
      }
    }
  };
}).call(this);
