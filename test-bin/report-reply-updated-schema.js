(function(){
  var reportReplyUpdatedSchema;
  reportReplyUpdatedSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      cid: {
        description: '回复所属的评论id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
