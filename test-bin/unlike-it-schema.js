(function(){
  var unlikeItSchema;
  unlikeItSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: {
        description: '点赞的类型',
        type: 'string',
        'enum': ['interesting-point', 'interesting-point-session', 'comment', 'reply'],
        required: true
      },
      id: {
        description: '兴趣点、兴趣点会话、评论或者回复的id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
