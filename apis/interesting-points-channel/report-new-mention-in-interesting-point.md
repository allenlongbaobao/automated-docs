### report-new-mention-in-interesting-point 请求报文的 JSON Schema
<pre><code>
report-new-mention-in-interesting-point-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: ''
      type: 'string'
      required: true

</code></pre>

### report-new-mention-in-interesting-point 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### report-new-mention-in-interesting-point 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


