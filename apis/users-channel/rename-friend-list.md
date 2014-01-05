# this is this is req

h2 this is req

code:
    request-rename-friend-list = 
  original-list-name: '大学同学'
  new-list-name: '大学软院同学'


# this is this is req

h2 this is req

code:
    response-rename-friend-list =
  result: 'success'
  errors: []
  




# this is this is req

h2 this is req

code:
    rename-friend-list-schema =
  type: 'object'
  additional-properties: false
  properties:
    old-list-name :
      description: '分组原名称'
      type: 'string'
      required: true
    new-list-name:
      description: '分组新名称'
      type: 'string'
      required: true



