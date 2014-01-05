### retrieve-watching-users 请求报文的 JSON Schema
<pre><code>
retrieve-watching-users-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '查询类型'
      type: 'string'
      enum: ['interesting-point', 'interesting-point-session']
      required: true
    id:
      description: '查询的兴趣点或者会话id'
      type: 'string'
      required: true
    offset: 
      description: '查询对象的偏移量'
      type: 'string'
      default: 1
    count:
      description: '查询返回的数量'
      type: 'number'
      default: 10

</code></pre>

### retrieve-watching-users 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-watching-users 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


