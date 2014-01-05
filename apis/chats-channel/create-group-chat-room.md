### create-group-chat-room 请求报文的 JSON Schema
<pre><code>
# JSON Schema
create-a-group-chat-room-schema =
  type: 'object'
  additional-properties: false
  properties:
    initial-members:
      description: '新建聊天室时的初始化成员'
      type: 'array'
      min-items: 1
      max-items: 20
      items:
        type: 'string'
      required: true
    name:
      description: '聊天室名字'
      type: 'string'
      required: true
    signature:
      description: '聊天室签名'
      type: 'string'
      required: true

</code></pre>

### create-group-chat-room 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### create-group-chat-room 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


