# this is this is req

h2 this is req

code:

<pre><code>    # JSON Schema
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

