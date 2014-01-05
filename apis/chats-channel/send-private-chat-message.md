### send-private-chat-message 请求报文的 JSON Schema
<pre><code>
send-new-chat-message-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '聊天室的ObjectId'
      type: 'string'
      required: true
    original-content-type:
      description: '聊天消息的原生内容类型'
      type: 'string'
      enum: ['voice', 'text']
      required: true
    text-content:
      description: '文字消息的内容'
      type: 'string'
      required: true
    voice-content:
      description: '语音消息的链接地址'
      type: 'string'
      required: true

</code></pre>

### send-private-chat-message 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### send-private-chat-message 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


