### remove-friend-list 请求报文的 JSON Schema
<pre><code>
remove-friend-list-schema =
  type: 'object'
  additional-properties: false
  properties:
    list-name: 
      description: 'the list name to be removed'
      type: 'string'
      required: true


</code></pre>

### remove-friend-list 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### remove-friend-list 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


