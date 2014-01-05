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
