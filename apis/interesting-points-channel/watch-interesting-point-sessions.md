### watch-interesting-point-sessions 请求报文的 JSON Schema
<pre><code>
watch-interesting-point-sessions-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsids:
      description: '关注的兴趣点会话id数组'
      type: 'array'
      min-items: 1
      required: true
      items:
        type: 'string'
        description: '兴趣点会话id'

</code></pre>

### watch-interesting-point-sessions 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### watch-interesting-point-sessions 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>

