(function(){
  var reportCircleMemberUpdatedSchema;
  reportCircleMemberUpdatedSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '更新的群组id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
