### retrieve-received-mentions 请求报文的 JSON Schema
<pre><code>
retrieve-received-mentions-schema =
  type: 'object'
  additional-properties: false
  properties:
    skip:
      description: '查询偏移量'
      type: 'number'
      default: 0
      required: false
    limit:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false
    from:
      description: '消息发送者的id，为空时表示所有用户'
      type: 'string'
      required: false
    type:
      description: '@的类型'
      type: 'string'
      enum: ['all', 'interesting-point', 'comment', 'reply']
      default: 'all'
      required: false
    unread:
      description: '是否只获取未读的消息'
      type: 'boolean'
      default: false
      required: false

</code></pre>

### retrieve-received-mentions 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-received-mentions 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


