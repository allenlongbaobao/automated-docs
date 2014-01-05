(function(){
  var removeRepliesSchema;
  removeRepliesSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      rids: {
        description: '要删除的回复id数组',
        type: 'array',
        required: true,
        minItems: 1,
        items: {
          type: 'string',
          description: '回复id'
        }
      }
    }
  };
}).call(this);
