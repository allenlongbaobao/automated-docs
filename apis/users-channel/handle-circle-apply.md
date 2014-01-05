### handle-circle-apply 请求报文的 JSON Schema
<pre><code>
handle-circle-apply-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '处理类型'
      type: 'string'
      enum: ['accepted', 'rejected']
      required: true
    uid:
      description: '申请加入的用户id'
      type: 'string'
      required: true
    cid:
      description: '要申请加入的群组id'
      type: 'string'
      required: true

</code></pre>

### handle-circle-apply 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### handle-circle-apply 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


