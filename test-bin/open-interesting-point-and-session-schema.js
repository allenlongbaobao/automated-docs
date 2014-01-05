(function(){
  var openInterestingPointSchema;
  openInterestingPointSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipid: {
        description: '打开的兴趣点id',
        type: 'string',
        required: true
      },
      ipsid: {
        description: '正在浏览的会话id',
        type: 'string',
        required: true
      }
    }
  };
}).call(this);
