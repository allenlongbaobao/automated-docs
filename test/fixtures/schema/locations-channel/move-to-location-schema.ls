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
