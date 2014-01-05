### handle-chat-room-invite 请求报文的 JSON Schema
<pre><code>
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

</code></pre>

### handle-chat-room-invite 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### handle-chat-room-invite 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


