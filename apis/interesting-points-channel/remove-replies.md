### remove-replies 请求报文的 JSON Schema
<pre><code>
remove-replies-schema =
  type: 'object'
  additional-properties: false
  properties:
    rids:
      description: '要删除的回复id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        type: 'string'
        description: '回复id'

</code></pre>

### remove-replies 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### remove-replies 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


