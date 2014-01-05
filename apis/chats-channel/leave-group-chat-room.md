### leave-group-chat-room 请求报文的 JSON Schema
<pre><code>
# JSON Schema
leave-chat-rooms-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '离开的聊天室id'
      type: 'string'
      required: true

</code></pre>

### leave-group-chat-room 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### leave-group-chat-room 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


