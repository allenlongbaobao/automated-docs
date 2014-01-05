### logout 请求报文的 JSON Schema
<pre><code>
logout-schema =
  type: 'object'
  additional-properties: false
  properties:
    token:
      description: '用户在主站退出后返回的标识'
      type: 'string'
      required: true

</code></pre>

### logout 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### logout 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


