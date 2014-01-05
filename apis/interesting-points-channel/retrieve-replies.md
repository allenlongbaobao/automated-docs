### retrieve-replies 请求报文的 JSON Schema
<pre><code>
retrieve-replies-schema =
  type: 'object'
  additional-properties: false
  properties:
    cid:
      description: '评论id'
      type: 'string'
      required: true
    last-access-time:
      description: '最后访问时间，用于查询最新、未读的记录'
      type: 'string'
      default: ''
    skip:
      description: '查询对象的偏移量'
      type: 'number'
      default: 0
    limit:
      description: '查询返回的数量'
      type: 'number'
      default: 10
    sort:
      description: '时间排序方式'
      type: 'number'
      default: 1

</code></pre>

### retrieve-replies 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-replies 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


