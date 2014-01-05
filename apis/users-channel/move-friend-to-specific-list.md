request-move-friend-to-specific-list =
  uid: 'uid-1'
  specific-list-name: '大学好友'
response-move-friend-to-specific-list =
  result: 'success'
  errors: []

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
