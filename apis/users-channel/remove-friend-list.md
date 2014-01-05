# this is this is req

h2 this is req

code:

     request-remove-friend-list = 
  list-name: '不认识的人'


# this is this is req

h2 this is req

code:

     response-remove-friend-list = 
  result: 'success'
  errors: []



# this is this is req

h2 this is req

code:

     remove-friend-list-schema =
  type: 'object'
  additional-properties: false
  properties:
    list-name: 
      description: 'the list name to be removed'
      type: 'string'
      required: true



