(function(){
  var sendCircleInviteSchema;
  sendCircleInviteSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      uids: {
        description: '用户id数组',
        type: 'array',
        required: true,
        items: {
          type: 'string'
        }
      }
    }
  };
}).call(this);
