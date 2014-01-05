### report-new-chat-message 请求报文的 JSON Schema
<pre><code>
report-new-chat-room-message-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室id'
      type: 'string'
      required: true
    type:
      description: '消息所属聊天室类型'
      type: 'string'
      enum: ['private-chat', 'group-chat']
      required: true

</code></pre>

### report-new-chat-message 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### report-new-chat-message 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


