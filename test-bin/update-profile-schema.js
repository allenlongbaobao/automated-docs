(function(){
  var updateProfileSchema;
  updateProfileSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      username: {
        description: '用户名',
        type: 'string',
        required: true
      },
      gender: {
        description: '用户性别',
        type: 'string',
        'enum': ['M', 'F', 'U'],
        required: true
      },
      email: {
        description: '用户邮箱地址',
        type: 'string',
        required: true
      },
      avatar: {
        description: '用户头像地址',
        type: 'string',
        required: true
      },
      signature: {
        description: '用户个性签名',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
