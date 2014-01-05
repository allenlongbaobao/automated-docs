(function(){
  var reportCommentUpdatedSchema;
  reportCommentUpdatedSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipsid: {
        description: '评论所属的会话id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
