### close-interesting-point-and-session 请求报文的 JSON Schema
<pre><code>
close-interesting-point-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '要关闭的兴趣点id'
      type: 'string'
      required: true
    ipsid:
      description: '要关闭兴趣点会话id'
      type: 'string'
      required: true

</code></pre>

### close-interesting-point-and-session 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### close-interesting-point-and-session 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


