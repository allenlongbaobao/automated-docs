### retrieve-matched-friends-name-with-part-name 请求报文的 JSON Schema
<pre><code>
retrieve-matched-friends-name-with-part-name-schema =
  type: 'object'
  additional-properties: false
  properties:
    part-name:
      description: '需要查询的部分名称'
      type: 'string'
      required: true

</code></pre>

### retrieve-matched-friends-name-with-part-name 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-matched-friends-name-with-part-name 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


