(function(){
  var removeTagsSchema;
  removeTagsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipid: {
        description: '标签所在兴趣点id',
        type: 'string',
        required: true
      },
      tags: {
        description: '标签id数组',
        type: 'array',
        required: true,
        minItems: 1,
        items: {
          description: '标签名',
          type: 'string'
        }
      }
    }
  };
}).call(this);
