(function(){
  var switchSessionSchema;
  switchSessionSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      newIpsid: {
        description: '切换后的会话id',
        type: 'string',
        required: true
      },
      oldIpsid: {
        description: '切换前的会话id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
