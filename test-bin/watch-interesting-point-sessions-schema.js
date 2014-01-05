(function(){
  var watchInterestingPointSessionsSchema;
  watchInterestingPointSessionsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipsids: {
        description: '关注的兴趣点会话id数组',
        type: 'array',
        minItems: 1,
        required: true,
        items: {
          type: 'string',
          description: '兴趣点会话id'
        }
      }
    }
  };
}).call(this);
