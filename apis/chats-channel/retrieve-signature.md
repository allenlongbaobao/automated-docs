retrieve-signature = 
  cid: 'cid-1'

# 成功
response-retrieve-signature =
  result: 'success'
  signature: 'weiki is a good boy!'
  errors: []

retrieve-signature-schema = 
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true




