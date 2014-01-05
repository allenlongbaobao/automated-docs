answer-location-internality-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid:
      description: 'location的id'
      type: 'string'
      required: true
    result:
      description: '检查是否成功'
      type: 'string'
      enum: ['success', 'failed']
      required: true
    is-internal:
      description: '是否为内部'
      type: 'boolean'
      required: true
