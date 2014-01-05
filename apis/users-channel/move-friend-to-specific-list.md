### move-friend-to-specific-list 请求报文的 JSON Schema
<pre><code>
move-friend-to-specific-list-schema = 
  type: 'object'
  additional-properties: false
  properties:
    uid:
      desctiption: 'the id of moved user'
      type: 'string'
      required: true
    specific-list-name:
      description: 'list-name which the user is moved to'
      type: 'string'
      required: true

</code></pre>

### move-friend-to-specific-list 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### move-friend-to-specific-list 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


