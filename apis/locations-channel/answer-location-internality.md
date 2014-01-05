### answer-location-internality 请求报文的 JSON Schema
<pre><code>
answer-location-internality-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid:
      description: 'location的id'
      type: 'string'
      required: true
    result:
      description: '检查是否成功'
      type: 'string'
      enum: ['success', 'failed']
      required: true
    is-internal:
      description: '是否为内部'
      type: 'boolean'
      required: true

</code></pre>

### answer-location-internality 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### answer-location-internality 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


