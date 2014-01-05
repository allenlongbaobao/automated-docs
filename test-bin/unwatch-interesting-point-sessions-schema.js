(function(){
  var unwatchInterestingPointSessionsSchema;
  unwatchInterestingPointSessionsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipsids: {
        description: '关注的兴趣点会话id数组',
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
