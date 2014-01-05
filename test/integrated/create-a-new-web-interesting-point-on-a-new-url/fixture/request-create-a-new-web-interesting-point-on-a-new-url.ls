request-create-a-new-web-interesting-point-on-a-new-url =
  type: 'web' # web | real
  title: '测试在新url上发布的新兴趣点'
  content: '人类已经无法阻挡@+了' # 以后可以是HTML内容
  within-location:
    # 这里与create-a-new-web-interesting-point的区别在于，没有传lid
    location-type: 'web' #!! derived from location
    url: 'http://some.com' # !!duplicated from location
    name: "url未知的神秘所在" #!!duplicated from location
    at-position: # position的所有信息都内嵌在这里，没有单独的position document
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
  is-private: false # default 当true时，只有shared-with的人才能够看到
  shared-with: []
  pictures: # 这里有待确定是在客户端捕获网页快照，还是在服务端screen scraper
    * type: 'snapshot' # web端肯定是snaphot
      url: '/user-pictures/uid-1/1' # uid为creator的id，资源为：http://at-plus-server/pictures/uid/2
    ...
  tags: ['tid-1', 'tid-2']
