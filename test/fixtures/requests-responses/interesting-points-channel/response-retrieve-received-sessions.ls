response-retrieve-received-sessions =
  result: "success"
  errors: []
  interesting-point-sessions:
    * _id: 'ipsid-1' # interesting point session id
      ipid: 'ipid-1' # interesting point id
      title: '支持恒大的进来！！'
      created-by:
        _id: 'uid-1'
        username: 'Shin'
        gender: 'M'
        avatar: 'xxxx'
        signature: 'xxxx'
        email: 'xxxx'
      create-time: '2013-10-11 12:00:13'
      watched-by: ['uid-1', 'uid-2'] # 关注会话的用户
      commented-by: ['uid-1', 'uid-2'] # 评论会话的用户
      comments-count: 20
      liked-by: ['uid-1']
      interesting-point: # 会话所在兴趣点
        _id: 'xxxx'
        type: 'web'
        title: '无法阻挡的@+'
        content: '人类已经无法阻挡@+了' # 以后可以是HTML内容
        create-time: '2013-08-18 23:11:09'
        within-location:
          lid: 'lid-1'
          location-type: 'web' #!! derived from location
          url: 'http://some.com' # !!duplicated from location
          name: '@+主页' #!!duplicated from location
          at-poisition: # position的所有信息都内嵌在这里，没有单独的position document
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
        created-by: 'uid-1'
        is-private: false
        interesting-point-sessions-count: 20 # 兴趣点会话的数量
        shared-with: ['uid-2', 'uid-3']
        watched-by: ['uid-4', 'uid-5']
        at-users: []
        liked-by: ['uid-1']
        pictures:
          * type: 'snapshot' # snapshot | photo
            url: '/user-pictures/uid-1/1' # uid为creator的id，资源为：http://at-plus-server/pictures/uid/2
          ...
        reposts:
          * type: 'weibo' # 各个SNS，先暂时为weibo
            repost-id: 'xxxx' # 在weibo上的id，可用于查询回复和转发
            url: 'http://weibo.com/xxxx' # repost的地址
          ...
        tags:
          * _id: 'tid-1'
            name: '中山大学'
            alias:  ['中大', 'Sun yat-san University']
          ...
    ...

