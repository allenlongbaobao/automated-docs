(function(){
  var logoutSchema;
  logoutSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      token: {
        description: '用户在主站退出后返回的标识',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
