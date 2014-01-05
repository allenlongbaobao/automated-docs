### login 请求报文的 JSON Schema
<pre><code>
login-schema =
  type: 'object'
  additional-properties: false
  properties:
    token:
      description: '通过主站登录后返回的用户标识'
      type: 'string'
      required: true

</code></pre>

### login 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### login 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


