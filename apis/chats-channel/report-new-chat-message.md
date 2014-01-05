# this is this is req

h2 this is req

code:

     request-report-new-chat-room-message =
  cid: 'cid-1'


# this is this is req

h2 this is req

code:

     response-report-new-chat-room-message =
  result: 'success'
  errors: []


# this is this is req

h2 this is req

code:

     report-new-chat-room-message-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    type:
      description: '消息所属聊天室类型'
      type: 'string'
      enum: ['private-chat', 'group-chat']
      required: true


