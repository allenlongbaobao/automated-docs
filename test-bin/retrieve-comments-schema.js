(function(){
  var retrieveCommentsSchema;
  retrieveCommentsSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      ipsid: {
        description: '查询的会话id',
        type: 'string',
        required: true
      },
      lastAccessTime: {
        description: '最后访问时间，用于查询最新、未读记录',
        type: 'string',
        deafult: ''
      },
      skip: {
        description: '查询对象的偏移量',
        type: 'number',
        'default': 1
      },
      limit: {
        description: '查询返回的数量',
        type: 'number',
        'default': 10
      },
      sort: {
        description: '时间排序的方式',
        type: 'number',
        'default': 1
      }
    }
  };
}).call(this);
