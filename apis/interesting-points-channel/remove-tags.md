### remove-tags 请求报文的 JSON Schema
<pre><code>
remove-tags-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '标签所在兴趣点id'
      type: 'string'
      required: true
    tags:
      description: '标签id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '标签名'
        type: 'string'

</code></pre>

### remove-tags 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### remove-tags 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


