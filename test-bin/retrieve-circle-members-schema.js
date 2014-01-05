(function(){
  var retrieveCircleMembersSchema;
  retrieveCircleMembersSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '查询的群组id',
        type: 'string',
        required: true
      },
      offset: {
        description: '查询对象偏移量',
        type: 'number',
        'default': 1,
        required: true
      },
      count: {
        description: '查询数量',
        type: 'number',
        'default': 10,
        required: true
      }
    }
  };
}).call(this);
