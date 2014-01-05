### move-to-location 请求报文的 JSON Schema
<pre><code>
move-to-location-schema =
  type: 'object'
  additional-properties: false
  properties:
    longitude:
      description: '当前位置经度'
      type: 'number'
      required: true
    latitude:
      description: '当前位置纬度'
      type: 'number'
      required: true
    altitude:
      description: '当前位置高度'
      type: 'number'
      required: true

</code></pre>

### move-to-location 请求报文示例
<pre><code>
request-update-chat-room-signature =
  cid: 'cid-1'
  signature: '更改后的签名'

</code></pre>

### move-to-location 响应报文
<pre><code>
# 成功
response-update-chat-room-signature =
  result: 'success'
  errors: []

</code></pre>


