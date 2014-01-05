### retrieve-friends 请求报文的 JSON Schema
<pre><code>
retrieve-friends-schema =
  type: 'object'
  additional-properties: false
  properties:
    offset:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
      required: true
    count:
      description: '查询数量'
      type: 'number'
      default: 10
      required: true

</code></pre>

### retrieve-friends 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-friends 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


