# this is this is req

h2 this is req

code:
    request-update-chat-room-name =
  cid: 'cid-1'
  name: '更改后的名称'


# this is this is req

h2 this is req

code:
    # 成功
response-update-chat-room-name =
  result: 'success'
  errors: []
  


# this is this is req

h2 this is req

code:
    request-update-chat-room-name-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    name:
      description: '修改后的名称'
      type: 'string'
      required: true

