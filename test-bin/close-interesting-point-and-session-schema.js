(function(){
  var closeInterestingPointSchema;
  closeInterestingPointSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipid: {
        description: '要关闭的兴趣点id',
        type: 'string',
        required: true
      },
      ipsid: {
        description: '要关闭兴趣点会话id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
