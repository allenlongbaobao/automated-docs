request-create-a-new-web-interesting-point =
  type: 'web'
  title: '无法阻挡的@+'
  content: '@weike 好吧'
  within-location:
    lid: 'xxxx'
    location-type: 'web'
    url: 'http://at-plus.cn'
    name: '@+主页'
    at-position: 
      is-exist: true
      position-within-web-page:
        type: 'partial' # single | partial | multi
        mcs:
          * id: 'mcid-1'
            path: 'body > div#some-id:eq(2) > div:eq(2) > table#foo'
            html: "<table id='foo'> ... </table>"
            width: 324
            height: 200
            origin-top: 123
            origin-left: 234
            ip-offset:
              top: 20
              left: 10
              width: 200
              height: 100
          ...
        calculate-time: '2013-02-02 12:00:00'
        user-agent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
  is-private: false
  shared-with: []
  pictures:
    * type: 'snapshot'
      url: '/user-pictures/uid-1/1'
    ...
  tags: ['tid-1', 'tid-2']
  
