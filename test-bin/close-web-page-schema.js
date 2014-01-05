(function(){
  var closeWebPageSchema;
  closeWebPageSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      lid: {
        description: '关闭页面的id',
        type: 'string',
        required: true
      },
      url: {
        description: '关闭页面的url',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
