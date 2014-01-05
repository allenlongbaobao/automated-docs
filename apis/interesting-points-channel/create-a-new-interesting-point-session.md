### create-a-new-interesting-point-session 请求报文的 JSON Schema
<pre><code>
create-a-new-interesting-point-session-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '新建的会话所属的兴趣点id'
      type: 'string'
      required: true
    title:
      description: '新建会话的标题'
      type: 'string'
      required: true

</code></pre>

### create-a-new-interesting-point-session 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### create-a-new-interesting-point-session 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


