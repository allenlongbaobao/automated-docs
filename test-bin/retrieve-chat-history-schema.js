(function(){
  var retrieveChatHistorySchema;
  retrieveChatHistorySchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '聊天室id',
        type: 'string',
        required: true
      },
      referenceTime: {
        description: '查询对象基准时间',
        type: 'string',
        'default': 1,
        required: false
      },
      limit: {
        description: '查询对象数量',
        type: 'number',
        'default': 10,
        required: false
      }
    }
  };
}).call(this);
