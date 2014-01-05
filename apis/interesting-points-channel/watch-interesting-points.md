### watch-interesting-points 请求报文的 JSON Schema
<pre><code>
watch-interesting-points-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipids:
      description: '关注的兴趣点id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '兴趣点id'
        type: 'string'

</code></pre>

### watch-interesting-points 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### watch-interesting-points 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


