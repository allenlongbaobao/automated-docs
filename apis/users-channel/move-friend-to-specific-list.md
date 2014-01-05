# this is this is req

h2 this is req

code:

     request-move-friend-to-specific-list =
  uid: 'uid-1'
  specific-list-name: '大学好友'


# this is this is req

h2 this is req

code:

     response-move-friend-to-specific-list =
  result: 'success'
  errors: []



# this is this is req

h2 this is req

code:

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


