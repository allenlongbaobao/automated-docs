(function(){
  var removeFriendListSchema;
  removeFriendListSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      listName: {
        description: 'the list name to be removed',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
