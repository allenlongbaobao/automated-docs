### retrieve-likes 请求报文的 JSON Schema
<pre><code>
retrieve-likes-schema =
  type: 'object'
  additional-properties: false
  properties: 
    type:
      description: '查询类型'
      type: 'string'
      enum: ['interesting-point', 'interesting-point-session', 'comment', 'reply']
      required: true
    id:
      description: '兴趣点、会话、评论回复id'
      type: 'string'
      required: true
    offset:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
    count:
      description: '查询对象数量'
      type: 'number'
      default: 10

</code></pre>

### retrieve-likes 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-likes 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


