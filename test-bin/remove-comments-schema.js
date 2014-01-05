(function(){
  var removeCommentsSchema;
  removeCommentsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cids: {
        description: '要删除的评论id数组',
        type: 'array',
        required: true,
        minItems: 1,
        items: {
          description: '评论id',
          type: 'string'
        }
      }
    }
  };
}).call(this);
