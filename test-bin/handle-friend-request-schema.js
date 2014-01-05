(function(){
  var handleFriendRequestSchema;
  handleFriendRequestSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: {
        description: '处理类型',
        type: 'string',
        'enum': ['accepted', 'rejected'],
        required: true
      },
      uid: {
        description: '用户id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
