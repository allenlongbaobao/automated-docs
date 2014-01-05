### close-web-page 请求报文的 JSON Schema
<pre><code>
close-web-page-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid: 
      description: '关闭页面的id'
      type: 'string'
      required: true
    url:
      description: '关闭页面的url'
      type: 'string'
      required: true

</code></pre>

### close-web-page 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### close-web-page 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


