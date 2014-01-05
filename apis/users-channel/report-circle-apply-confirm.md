### report-circle-apply-confirm 请求报文的 JSON Schema
<pre><code>
report-circle-apply-confirm-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '群组的id'
      type: 'string'
      required: true

</code></pre>

### report-circle-apply-confirm 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### report-circle-apply-confirm 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>

