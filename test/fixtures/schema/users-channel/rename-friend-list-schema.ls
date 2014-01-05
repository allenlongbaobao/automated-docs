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

