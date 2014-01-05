(function(){
  var createANewReplySchema;
  createANewReplySchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: {
        description: '表示该信息的类型',
        type: 'string',
        'enum': ['ip-rpl', 'ips-msg', 'chat-msg'],
        required: true
      },
      ipid: {
        description: '回复所在的兴趣点id',
        type: 'string',
        required: true
      },
      ipsid: {
        description: '回复所在的兴趣点会话id',
        type: 'string',
        required: true
      },
      rMid: {
        description: '回复的评论id',
        type: 'string',
        required: true
      },
      originalContentType: {
        description: '原始回复内容类型',
        type: 'string',
        'enum': ['text', 'voice'],
        required: true
      },
      textContent: {
        description: '回复的文本内容',
        type: 'string',
        maxLength: 140,
        minLength: 1,
        required: true
      },
      voiceContent: {
        description: '回复的语音链接',
        type: 'string',
        minLength: 1,
        required: true
      },
      isAnonymous: {
        description: '是否匿名回复',
        type: 'boolean',
        required: true
      }
    }
  };
}).call(this);
