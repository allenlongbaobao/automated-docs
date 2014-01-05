### report-circle-member-updated 请求报文的 JSON Schema
<pre><code>
report-circle-member-updated-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '更新的群组id'
      type: 'string'
      required: true

</code></pre>

### report-circle-member-updated 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### report-circle-member-updated 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


