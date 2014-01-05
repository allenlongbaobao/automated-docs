(function(){
  var sendCircleApplySchema;
  sendCircleApplySchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cids: {
        description: '群组id数组',
        type: 'array',
        required: true,
        items: {
          type: 'string'
        }
      }
    }
  };
}).call(this);
