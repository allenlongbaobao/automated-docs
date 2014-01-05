(function(){
  var retrieveActiveUsersSchema;
  retrieveActiveUsersSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      url: {
        description: '����location��Ӧ��url',
        type: 'string',
        required: true
      },
      lid: {
        description: '����location��Ӧ��id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
