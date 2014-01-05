(function(){
  var createANewInterestingPointSessionSchema;
  createANewInterestingPointSessionSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipid: {
        description: '新建的会话所属的兴趣点id',
        type: 'string',
        required: true
      },
      title: {
        description: '新建会话的标题',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
