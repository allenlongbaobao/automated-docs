intinteresting-points =
  * _id: 'ipid-1'
    type: 'web' # web | real
    title: '无法阻挡的@+'
    content: '人类已经无法阻挡@+了' # 以后可以是html内容
    create-time: new Date((new Date).get-time! - 24 * 3600 * 1000)
    within-location:
      lid: 'lid-1'
      location-type: 'web' #!! derived from location
      url: 'http://www.some.com' # !!duplicated from location
      name: '中山大学体育馆' #!!duplicated from location
      at-poisition: # position的所有信息都内嵌在这里，没有单独的position document
        is-exist: true # default
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
          user-agent: "mozilla/5.0 (windows nt 6.1; wow64) applewebkit/537.36 (khtml, like gecko) chrome/30.0.1599.69 safari/537.36"
    created-by: 'uid-1'
    is-private: false # default 当true时，只有shared-with的人才能够看到
    shared-with: [] # @过的人，分享给的人。
    interesting-point-sessions-count: 1 # 兴趣点会话数量
    watched-by: [] # is-private false才可以订阅。
    liked-by: [] # 点赞的人
    at-users: ['uid-2']
    participant: []
    pictures: []
    reposts: []
    tags: []
  ...
