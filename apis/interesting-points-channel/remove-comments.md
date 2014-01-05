### remove-comments 请求报文的 JSON Schema
<pre><code>
remove-comments-schema =
  type: 'object'
  additional-properties: false
  properties:
    cids:
      description: '要删除的评论id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '评论id'
        type: 'string'

</code></pre>

### remove-comments 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### remove-comments 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


