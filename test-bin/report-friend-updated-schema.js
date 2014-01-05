(function(){
  var reportFriendUpdatedSchema;
  reportFriendUpdatedSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      uid: {
        description: '用户id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
