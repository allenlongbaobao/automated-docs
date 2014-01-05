### rename-friend-list 请求报文的 JSON Schema
<pre><code>
rename-friend-list-schema =
  type: 'object'
  additional-properties: false
  properties:
    old-list-name :
      description: '分组原名称'
      type: 'string'
      required: true
    new-list-name:
      description: '分组新名称'
      type: 'string'
      required: true


</code></pre>

### rename-friend-list 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### rename-friend-list 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


