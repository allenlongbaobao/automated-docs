### switch-session 请求报文的 JSON Schema
<pre><code>
switch-session-schema =
  type: 'object'
  additional-properties: false
  properties:
    new-ipsid:
      description: '切换后的会话id'
      type: 'string'
      required: true
    old-ipsid:
      description: '切换前的会话id'
      type: 'string'
      required: true

</code></pre>

### switch-session 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### switch-session 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


