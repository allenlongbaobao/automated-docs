### report-interesting-point-session-updated 请求报文的 JSON Schema
<pre><code>
report-interesting-point-session-updated-schema =
  type: 'object'
  additional-properties: false
  properties: 
    ipid: 
      description: '确认的会话所属的兴趣点id'
      type: 'string'
      required: true

</code></pre>

### report-interesting-point-session-updated 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### report-interesting-point-session-updated 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


