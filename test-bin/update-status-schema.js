(function(){
  var updateStatusSchema;
  updateStatusSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      status: {
        description: '用户状态',
        type: 'string',
        'enum': ['online', 'offline', 'invisible'],
        required: true
      }
    }
  };
}).call(this);
