(function(){
  var createFriendListSchema;
  createFriendListSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      listName: {
        description: 'new list name',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
