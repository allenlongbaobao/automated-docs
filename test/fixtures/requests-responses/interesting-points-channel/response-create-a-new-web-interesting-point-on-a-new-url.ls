response-create-a-new-web-interesting-point-on-a-new-url =
  result: 'success'
  errors: []
  created-location:
    _id: 'xxxx'
    type: 'web' # real | web
    name: '@+主页'
    is-existing: true # default
    is-internal: false # default 为true时，指不能够从公网访问的网页，或者公众无法进入的现实区域
    duration: 
      from: '2014-02-04 12:00:04'
      to: '2014-02-04 12:00:04' # 第一次报告这个location时from与to相同，之后，to是最后一次报告的时间
    interesting-points-count: 200 # 兴趣点数量
    watched-by: ['uid-1', 'uid-2']
    urls: ['http://some.com'] # url, only available when the type is web, 同一网页可能有多个网址对应。今后这部分可能单独做出一个key-value的应用来进行甑别。
    # retrieved-html: '<html> ... </html>'
    # web-page-snapshot: '/web-page-snapshot/_id' # 网页的快照，用于定位兴趣点（现在未必有用，但是将来会有用）
  created-interesting-point:
    _id: 'xxxx'
    type: 'web' # web | real
    title: '无法阻挡的@+'
    content: '好吧。。。'
    create-time: '2013-10-22 12:12:12'
    within-location:
      lid: 'lid-1'
      location-type: 'web' #!! derived from location
      url: 'http://some.com' # !!duplicated from location
      name: '@+主页' #!!duplicated from location
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
              origin-legt: 234
              ip-offset:
                top: 20
                left: 10
                width: 200
                height: 100
            ...
          calculate-time: '2013-02-02 12:00:00'
          user-agent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
    created-by:
      _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1/1'
      signature: '@+ is awesome!!'
    is-private: false
    shared-with: []
    interesting-point-sessions-count: 1 # 会话数，兴趣点创建时默认会产生第一个会话
    comments-count: 0
    watched-by: []
    at-users: []
    liked-by: []
    pictures:
      * type: 'snapshoot' # snapshoot | photo
        url: '/user-pictures/uid-1/1' # uid为creator的id，资源为：http://at-plus-server/pictures/uid/2  
      ...
    reposts: []
    tags: ['tid-1', 'tid-2']
    interesting-point-session:
      _id: 'xxxx'
      title: '无法阻挡的@+'
      content: '好吧。。。'
      create-time: '2013-08-18 23:11:09'
      created-by:
        _id: 'uid-1'
        username: 'Shin'
        gender: 'M'
        email: 'bossonchan@gmail.com'
        avatar: '/avatars/u/uid-1/1'
        signature: '@+ is awesome!!'
      commented-by: [] # 参与评论的人。 !! derived from message and interesting-point
      watched-by: []
      liked-by: []
      comments-count: 20 # 评论数

