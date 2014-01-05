(function(){
  var renameFriendListSchema;
  renameFriendListSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      oldListName: {
        description: '分组原名称',
        type: 'string',
        required: true
      },
      newListName: {
        description: '分组新名称',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
