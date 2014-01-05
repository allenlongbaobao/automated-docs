### unlike-it 请求报文的 JSON Schema
<pre><code>
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

</code></pre>

### unlike-it 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### unlike-it 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


