(function(){
  var retrieveSignatureSchema;
  retrieveSignatureSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '聊天室id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
