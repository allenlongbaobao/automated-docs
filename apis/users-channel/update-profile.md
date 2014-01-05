### update-profile 请求报文的 JSON Schema
<pre><code>
# JSON Schema
update-profile-schema =
  type: 'object'
  additional-properties: false
  properties:
    username:
      description: '用户名'
      type: 'string'
      required: true
    gender: 
      description: '用户性别'
      type: 'string'
      enum: ['M', 'F', 'U']
      required: true
    email:
      description: '用户邮箱地址'
      type: 'string'
      required: true
    avatar:
      description: '用户头像地址'
      type: 'string'
      required: true
    signature: 
      description: '用户个性签名'
      type: 'string'
      required: true

</code></pre>

### update-profile 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### update-profile 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


