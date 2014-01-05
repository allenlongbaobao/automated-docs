### unwatch-locations 请求报文的 JSON Schema
<pre><code>
unwatch-locations-schema =
  type: 'object'
  additional-properties: false
  properties:
    lids:
      description: '要取消关注的location的id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: 'location的id'
        type: 'string'

</code></pre>

### unwatch-locations 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### unwatch-locations 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


