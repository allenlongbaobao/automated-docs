(function(){
  var retrieveLikesSchema;
  retrieveLikesSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: {
        description: '查询类型',
        type: 'string',
        'enum': ['interesting-point', 'interesting-point-session', 'comment', 'reply'],
        required: true
      },
      id: {
        description: '兴趣点、会话、评论回复id',
        type: 'string',
        required: true
      },
      offset: {
        description: '查询对象偏移量',
        type: 'number',
        'default': 1
      },
      count: {
        description: '查询对象数量',
        type: 'number',
        'default': 10
      }
    }
  };
}).call(this);
