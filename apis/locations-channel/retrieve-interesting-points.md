### retrieve-interesting-points 请求报文的 JSON Schema
<pre><code>
retrieve-interesting-points-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid: 
      description: 'location的id'
      type: 'string'
      required: true
    offset:
      description: '查询对象的偏移量'
      type: 'number'
      default: 1
      required: false
    count:
      description: '查询返回的数量'
      type: 'number'
      default: 10
      required: false


</code></pre>

### retrieve-interesting-points 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-interesting-points 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


