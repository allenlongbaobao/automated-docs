### report-comment-updated-in-created-session 请求报文的 JSON Schema
<pre><code>
report-comment-updated-in-created-session-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsid:
      description: 'ȷ�ϵ��������ڵĻỰid'
      type: 'string'
      required: true

</code></pre>

### report-comment-updated-in-created-session 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### report-comment-updated-in-created-session 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


