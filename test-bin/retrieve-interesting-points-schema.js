(function(){
  var retrieveInterestingPointsSchema;
  retrieveInterestingPointsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      lid: {
        description: 'location的id',
        type: 'string',
        required: true
      },
      offset: {
        description: '查询对象的偏移量',
        type: 'number',
        'default': 1,
        required: false
      },
      count: {
        description: '查询返回的数量',
        type: 'number',
        'default': 10,
        required: false
      }
    }
  };
}).call(this);
