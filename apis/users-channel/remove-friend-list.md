request-remove-friend-list = 
  list-name: '不认识的人'
response-remove-friend-list = 
  result: 'success'
  errors: []

remove-friend-list-schema =
  type: 'object'
  additional-properties: false
  properties:
    list-name: 
      description: 'the list name to be removed'
      type: 'string'
      required: true

