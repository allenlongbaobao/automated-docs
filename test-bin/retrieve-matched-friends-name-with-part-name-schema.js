(function(){
  var retrieveMatchedFriendsNameWithPartNameSchema;
  retrieveMatchedFriendsNameWithPartNameSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      partName: {
        description: '需要查询的部分名称',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
