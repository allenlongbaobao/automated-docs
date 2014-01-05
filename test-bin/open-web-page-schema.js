(function(){
  var openWebPageSchema;
  openWebPageSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      url: {
        description: '打开的新页面的url',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
