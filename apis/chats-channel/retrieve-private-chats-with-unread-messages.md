### retrieve-private-chats-with-unread-messages 请求报文的 JSON Schema
<pre><code>
retrieve-private-chats-with-unread-messages-schema =
  type: 'object'
  additional-properties: false

</code></pre>

### retrieve-private-chats-with-unread-messages 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-private-chats-with-unread-messages 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


