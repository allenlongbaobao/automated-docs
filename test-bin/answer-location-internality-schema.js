(function(){
  var answerLocationInternalitySchema;
  answerLocationInternalitySchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      lid: {
        description: 'location的id',
        type: 'string',
        required: true
      },
      result: {
        description: '检查是否成功',
        type: 'string',
        'enum': ['success', 'failed'],
        required: true
      },
      isInternal: {
        description: '是否为内部',
        type: 'boolean',
        required: true
      }
    }
  };
}).call(this);
