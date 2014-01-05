(function(){
  var createANewCommentSchema;
  createANewCommentSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: {
        description: '信息的类型',
        type: 'string',
        'enum': ['ips-msg', 'ip-rpl', 'chat-msg'],
        required: true
      },
      ipid: {
        description: '评论所在兴趣点id',
        type: 'string',
        required: true
      },
      ipsid: {
        description: '评论所在兴趣点会话id',
        type: 'string',
        required: true
      },
      originalContentType: {
        description: '评论原始内容类型',
        type: 'string',
        'enum': ['text', 'voice'],
        required: true
      },
      textContent: {
        description: '评论文本内容',
        type: 'string',
        minLength: 1,
        maxLength: 140,
        required: true
      },
      voiceContent: {
        description: '评论语音链接',
        type: 'string',
        required: true
      },
      isAnonymous: {
        description: '是否匿名评论',
        type: 'boolean',
        required: true
      }
    }
  };
}).call(this);
