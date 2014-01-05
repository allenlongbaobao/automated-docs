logout-schema =
  type: 'object'
  additional-properties: false
  properties:
    token:
      description: '用户在主站退出后返回的标识'
      type: 'string'
      required: true
