(function(){
  var reportInterestingPointSessionUpdatedSchema;
  reportInterestingPointSessionUpdatedSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipid: {
        description: '确认的会话所属的兴趣点id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
