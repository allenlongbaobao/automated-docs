(function(){
  var addTagsSchema;
  addTagsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipid: {
        description: '兴趣点id',
        type: 'string',
        required: true
      },
      tags: {
        description: '新增标签数组',
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
