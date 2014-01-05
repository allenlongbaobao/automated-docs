request-move-to-location =
  longitude: 123
  latitude: 123
  altitude: 123
response-move-to-location =
  result: "success"
  errors: []
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
