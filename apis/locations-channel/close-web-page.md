request-close-web-page =
  lid: 'lid-1'
  url: 'http://www.baidu.com'
response-close-web-page =
  result: "success"
  errors: []
close-web-page-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid: 
      description: '关闭页面的id'
      type: 'string'
      required: true
    url:
      description: '关闭页面的url'
      type: 'string'
      required: true
