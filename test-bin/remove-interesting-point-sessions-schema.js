(function(){
  var removeInterestingPointSessionsSchema;
  removeInterestingPointSessionsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipsids: {
        description: '要删除的兴趣点会话id数组',
        type: 'array',
        required: true,
        minItems: 1,
        items: {
          description: '兴趣点会话id',
          type: 'string'
        }
      }
    }
  };
}).call(this);
