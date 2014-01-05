### update-chat-room-signature 请求报文的 JSON Schema
<pre><code>
request-update-chat-room-signature-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    signature:
      description: '修改后的签名'
      type: 'string'
      required: true

</code></pre>

### update-chat-room-signature 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### update-chat-room-signature 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


