(function(){
  var likeItSchema;
  likeItSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: {
        description: '点赞的类型',
        required: true,
        'enum': ['interesting-point', 'interesting-point-session', 'comment', 'reply'],
        type: 'string'
      },
      id: {
        description: '兴趣点、兴趣点会话、评论或者回复id',
        required: true,
        type: 'string'
      }
    }
  };
}).call(this);
