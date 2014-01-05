### create-a-new-comment 请求报文的 JSON Schema
<pre><code>
create-a-new-comment-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '信息的类型'
      type: 'string'
      enum: ['ips-msg', 'ip-rpl', 'chat-msg']
      required: true
    ipid:
      description: '评论所在兴趣点id'
      type: 'string'
      required: true
    ipsid:
      description: '评论所在兴趣点会话id'
      type: 'string'
      required: true
    original-content-type:
      description: '评论原始内容类型'
      type: 'string'
      enum: ['text', 'voice']
      required: true
    text-content:
      description: '评论文本内容'
      type: 'string'
      min-length: 1
      max-length: 140
      required: true
    voice-content:
      description: '评论语音链接'
      type: 'string'
      required: true
    is-anonymous:
      description: '是否匿名评论'
      type: 'boolean'
      required: true

</code></pre>

### create-a-new-comment 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### create-a-new-comment 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


