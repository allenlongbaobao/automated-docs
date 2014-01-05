### open-interesting-point-and-session 请求报文的 JSON Schema
<pre><code>
open-interesting-point-schema  =
  type: 'object'
  additional-properties: false
  properties: 
    ipid: 
      description: '打开的兴趣点id'
      type: 'string'
      required: true
    ipsid:
      description: '正在浏览的会话id'
      type: 'string'
      required: true

</code></pre>

### open-interesting-point-and-session 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### open-interesting-point-and-session 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


