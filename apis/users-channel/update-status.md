### update-status 请求报文的 JSON Schema
<pre><code>
# JSON Schema
update-status-schema =
  type: 'object'
  additional-properties: false
  properties:
    status:
      description: '用户状态'
      type: 'string'
      enum: ['online', 'offline', 'invisible']
      required: true

</code></pre>

### update-status 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### update-status 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


