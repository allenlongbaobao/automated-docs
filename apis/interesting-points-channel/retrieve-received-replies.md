### retrieve-received-replies 请求报文的 JSON Schema
<pre><code>
retrieve-received-replies-schema =
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
      description: '消息发送者的id'
      type: 'sring'
      required: false
    unread:
      description: '是否只返回未读'
      type: 'boolean'
      default: false
      required: false

</code></pre>

### retrieve-received-replies 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-received-replies 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


