### like-it 请求报文的 JSON Schema
<pre><code>
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

</code></pre>

### like-it 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### like-it 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


