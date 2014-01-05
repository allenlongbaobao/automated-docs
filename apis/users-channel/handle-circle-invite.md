### handle-circle-invite 请求报文的 JSON Schema
<pre><code>
handle-circle-invite-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '处理类型'
      type: 'string'
      enum: ['accepted', 'rejected']
      required: true
    cid:
      description: '群组id'
      type: 'string'
      required: true

</code></pre>

### handle-circle-invite 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### handle-circle-invite 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>

