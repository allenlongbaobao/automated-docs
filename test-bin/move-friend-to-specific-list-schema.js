(function(){
  var moveFriendToSpecificListSchema;
  moveFriendToSpecificListSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      uid: {
        desctiption: 'the id of moved user',
        type: 'string',
        required: true
      },
      specificListName: {
        description: 'list-name which the user is moved to',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
