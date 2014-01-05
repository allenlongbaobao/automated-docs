### retrieve-active-users 请求报文的 JSON Schema
<pre><code>
retrieve-active-users-schema =
  type: 'object'
  additional-properties: false
  properties:
    url:
      description: '����location��Ӧ��url'
      type: 'string'
      required: true
    lid:
      description: '����location��Ӧ��id'
      type: 'string'
      required: true

</code></pre>

### retrieve-active-users 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-active-users 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


