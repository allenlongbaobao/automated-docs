locations =
  * _id: 'lid-1'
    type: 'web' # real | web
    name: '中山大学体育馆'
    is-existing: true # default
    is-internal: false # default 为true时，指不能够从公网访问的网页，或者公众无法进入的现实区域
    duration:
      from: '2014-02-04 12:00:04'
      to: '2014-02-04 12:00:04' # 第一次报告这个location时from与to相同，之后，to是最后一次报告的时间
    interesting-points-count: 10 # 兴趣点数量
    watched-by: []
    urls: ['http://www.some.com'] # url, only available when the type is web, 同一网页可能有多个网址对应。今后这部分可能单独做出一个key-value的应用来进行甑别。
    retrieved-html: '<html> ... </html>'
    web-page-snapshot: '/web-page-snapshot/_id' # 网页的快照，用于定位兴趣点（现在未必有用，但是将来会有用）
  ...
