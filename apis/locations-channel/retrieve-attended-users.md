### retrieve-attended-users 请求报文的 JSON Schema
<pre><code>
retrieve-attended-users-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid:
      description: '所在location对应的id'
      type: 'string'
      required: true

</code></pre>

### retrieve-attended-users 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-attended-users 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


