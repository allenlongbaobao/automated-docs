### retrieve-profile 请求报文的 JSON Schema
<pre><code>
# JSON Schema
retrieve-profile-schema =
  type: 'object'
  additional-properties: false
  properties:
    uid:
      description: '用户ObjectId'
      type: 'string'
      required: true

</code></pre>

### retrieve-profile 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-profile 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


