# this is this is req

h2 this is req

code:

     request-move-to-location =
  longitude: 123
  latitude: 123
  altitude: 123


# this is this is req

h2 this is req

code:

     response-move-to-location =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:

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


