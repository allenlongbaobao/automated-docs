# this is this is req

h2 this is req

code:
    request-handle-chat-room-invite =
  cid: 'cid-1'
  type: 'accepted' # rejected


# this is this is req

h2 this is req

code:
    response-handle-chat-room-invite =
  result: 'success'
  errors: []
  new-chat-room: # 当accepted时才会返回的属性
    cid: 'cid-1'
    name: '聊天室1'
    signature: ''
    members:
      * uid: 'uid-1'
        username: 'Shin'
      ...


# this is this is req

h2 this is req

code:
    # JSON Schame
handle-chat-room-invite-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    type:
      description: '处理结果'
      type: 'string'
      enum: ['accepted', 'rejected']
      required: true


