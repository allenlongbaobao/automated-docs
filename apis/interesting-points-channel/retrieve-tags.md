### retrieve-tags 请求报文的 JSON Schema
<pre><code>
retrieve-tags-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '兴趣点id'
      type: 'string'
      required: true
    offset:
      description: '查询对象的偏移量'
      type: 'number'
      default: 0
    count:
      description: '查询返回的数量'
      type: 'number'
      default: 10

</code></pre>

### retrieve-tags 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-tags 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


