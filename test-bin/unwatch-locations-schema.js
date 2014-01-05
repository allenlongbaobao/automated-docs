(function(){
  var unwatchLocationsSchema;
  unwatchLocationsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      lids: {
        description: '要取消关注的location的id数组',
        type: 'array',
        required: true,
        minItems: 1,
        items: {
          description: 'location的id',
          type: 'string'
        }
      }
    }
  };
}).call(this);
