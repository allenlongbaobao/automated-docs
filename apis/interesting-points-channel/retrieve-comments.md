### retrieve-comments 请求报文的 JSON Schema
<pre><code>
retrieve-comments-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsid:
      description: '查询的会话id'
      type: 'string'
      required: true
    last-access-time:
      description: '最后访问时间，用于查询最新、未读记录'
      type: 'string'
      deafult: ''
    skip:
      description: '查询对象的偏移量'
      type: 'number'
      default: 1
    limit:
      description: '查询返回的数量'
      type: 'number'
      default: 10
    sort:
      description: '时间排序的方式'
      type: 'number'
      default: 1

</code></pre>

### retrieve-comments 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### retrieve-comments 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


