# this is this is req

h2 this is req

code:

     request-like-it =
  type: 'interesting-point' # interesting-point | interesting-point-session | comment | reply
  id: 'xxx'


# this is this is req

h2 this is req

code:

     response-like-it =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

     like-it-schema =
  type: 'object'
  additional-properties: false
  properties:
    type: 
      description: '点赞的类型'
      required: true 
      enum: ['interesting-point', 'interesting-point-session', 'comment', 'reply']
      type: 'string'
    id:
      description: '兴趣点、兴趣点会话、评论或者回复id'
      required: true
      type: 'string'


