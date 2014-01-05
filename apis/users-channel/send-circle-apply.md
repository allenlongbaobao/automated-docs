### send-circle-apply 请求报文的 JSON Schema
<pre><code>
send-circle-apply-schema =
  type: 'object'
  additional-properties: false
  properties:
    cids:
      description: '群组id数组'
      type: 'array'
      required: true
      items:
        type: 'string'

</code></pre>

### send-circle-apply 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### send-circle-apply 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


