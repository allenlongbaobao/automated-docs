(function(){
  var unwatchInterestingPointsSchema;
  unwatchInterestingPointsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipids: {
        description: '关注的兴趣点id数组',
        type: 'array',
        required: true,
        minItems: 1,
        items: {
          description: '兴趣点id',
          type: 'string'
        }
      }
    }
  };
}).call(this);
