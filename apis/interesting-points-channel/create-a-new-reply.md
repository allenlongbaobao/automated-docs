### create-a-new-reply 请求报文的 JSON Schema
<pre><code>
create-a-new-reply-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '表示该信息的类型'
      type: 'string'
      enum: ['ip-rpl', 'ips-msg', 'chat-msg']
      required: true
    ipid:
      description: '回复所在的兴趣点id'
      type: 'string'
      required: true
    ipsid:
      description: '回复所在的兴趣点会话id'
      type: 'string'
      required: true
    r-mid:
      description: '回复的评论id'
      type: 'string'
      required: true
    original-content-type:
      description: '原始回复内容类型'
      type: 'string'
      enum: ['text', 'voice']
      required: true
    text-content:
      description: '回复的文本内容'
      type: 'string'
      max-length: 140
      min-length: 1
      required: true
    voice-content:
      description: '回复的语音链接'
      type: 'string'
      min-length: 1
      required: true
    is-anonymous:
      description: '是否匿名回复'
      type: 'boolean'
      required: true

</code></pre>

### create-a-new-reply 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### create-a-new-reply 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


