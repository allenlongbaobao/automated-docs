(function(){
  var retrieveProfileSchema;
  retrieveProfileSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      uid: {
        description: '用户ObjectId',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
