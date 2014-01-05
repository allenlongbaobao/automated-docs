(function(){
  var loginSchema;
  loginSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      token: {
        description: '通过主站登录后返回的用户标识',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
