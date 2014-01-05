request-retrieve-received-mentions =
  skip: 0
  limit: 10
  from: 'uid-1'
  type: 'comment'
  unread: true
response-retrieve-received-mentions =
  result: "success"
  errors: []
  unread-mentions:
    # 当@消息出现在兴趣点时的返回的兴趣点数据
    * _id: 'xxxx'
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
      created-by: 
        _id: 'uid-1'
        username: '张三'
        gender: 'F'
        avatar: '/avatars/u/uid/1'
        email: 'bossonchan@gmai.com'
        signature: '我是张三'
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
retrieve-received-mentions-schema =
  type: 'object'
  additional-properties: false
  properties:
    skip:
      description: '查询偏移量'
      type: 'number'
      default: 0
      required: false
    limit:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false
    from:
      description: '消息发送者的id，为空时表示所有用户'
      type: 'string'
      required: false
    type:
      description: '@的类型'
      type: 'string'
      enum: ['all', 'interesting-point', 'comment', 'reply']
      default: 'all'
      required: false
    unread:
      description: '是否只获取未读的消息'
      type: 'boolean'
      default: false
      required: false
