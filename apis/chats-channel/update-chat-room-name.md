### update-chat-room-name 请求报文的 JSON Schema
<pre><code>
request-update-chat-room-name-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    name:
      description: '修改后的名称'
      type: 'string'
      required: true

</code></pre>

### update-chat-room-name 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### update-chat-room-name 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


