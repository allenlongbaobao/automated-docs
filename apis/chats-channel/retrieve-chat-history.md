### retrieve-chat-history 请求报文的 JSON Schema
<pre><code>
retrieve-chat-history-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    reference-time:
      description: '查询对象基准时间'
      type: 'string'
      default: 1
      required: false
    limit:
      description: '查询对象数量'
      type: 'number'
      default: 10
      required: false

</code></pre>

### retrieve-chat-history 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-chat-history 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


