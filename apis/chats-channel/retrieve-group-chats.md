### retrieve-group-chats 请求报文的 JSON Schema
<pre><code>
retrieve-group-chats-schema = 
  type: 'object'
  additional-properties: false

</code></pre>

### retrieve-group-chats 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-group-chats 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


