remove-tags-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '标签所在兴趣点id'
      type: 'string'
      required: true
    tags:
      description: '标签id数组'
      type: 'array'
      required: true
      min-items: 1
      items:
        description: '标签名'
        type: 'string'
