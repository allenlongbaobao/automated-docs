response-create-a-new-web-interesting-point =
  result: "success"
  errors: []
  created-interesting-point:
    _id: 'xxxx'
    type: 'web' # web | real
    title: '无法阻挡的@+'
    content: '好吧。。。'
    create-time: '2013-10-22 12:12:12'
    within-location:
      lid: 'lid-1'
      location-type: 'web' #!! derived from location
      url: 'http://at-plus.cn' # !!duplicated from location
      name: '@+主页' #!!duplicated from location
      at-position: # position的所有信息都内嵌在这里，没有单独的position document
        is-exist: true # default
        position-within-web-page:
          type: 'partial' # single | partial | multi
          mcs:
            * id: ''
              path: 'body > div#some-id:eq(2) > div:eq(3) > div:eq(2)'
              html: "<table></table>"
              width: 324
              height: 200
              origin-top: 123
              origin-left: 234
              ip-offset:
                top: 20
                left: 10
                width: 100
                height: 200
            ...
          calculate-time: '2014-01-03 12:00:12.2345'
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
    interesting-point-sessions-count: 1 # 兴趣点会话数，新建的兴趣点默认会产生一个新的会话
    comments-count: 0
    watched-by: []
    liked-by: []
    at-users: []
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
      comments-count: 0 # 评论数
