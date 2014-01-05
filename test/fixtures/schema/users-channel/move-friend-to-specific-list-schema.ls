move-friend-to-specific-list-schema = 
  type: 'object'
  additional-properties: false
  properties:
    uid:
      desctiption: 'the id of moved user'
      type: 'string'
      required: true
    specific-list-name:
      description: 'list-name which the user is moved to'
      type: 'string'
      required: true
