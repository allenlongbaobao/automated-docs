response-open-web-page =
  result: 'success'
  errors: []
  opened-web-page: # 这里请注意！！！！！ 如果url找不到对应的location数据，直接返回 {}
    _id: 'lid-1'
    type: 'web'
    name: '@+主页'
    is-existing: true
    is-internal: false
    interesting-points-count: 20
    duration:
      from: '2013-10-22 12:12:12'
      to: '2013-10-22 12:12:12'
    watched-by: ['uid-1']
    urls:
      'http://some.com'
      'http://some.com/index.html'
      ...
