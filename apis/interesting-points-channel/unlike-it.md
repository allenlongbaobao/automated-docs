# this is this is req

h2 this is req

code:

     request-unlike-it =
  type: 'interesting-point' # interesting-point | interesting-point-session | comment | reply
  id: 'xxx'


# this is this is req

h2 this is req

code:

     response-unlike-it =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

     unlike-it-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '点赞的类型'
      type: 'string'
      enum: ['interesting-point', 'interesting-point-session', 'comment', 'reply']
      required: true
    id:
      description: '兴趣点、兴趣点会话、评论或者回复的id'
      type: 'string'
      required: true


