request-retrieve-interesting-points =
  lid: 'lid-1'
  offset: 1
  count: 10
response-retrieve-interesting-points =
  result: "success"
  errors: []
  interesting-points-count: 10
  interesting-points:
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
        username: '张三'
        gender: 'F'
        avatar: '/avatars/u/uid/1'
        signature: '我是张三'
      is-private: false
      interesting-point-sessions-count: 20 # 兴趣点会话的数量
      comments-count: 30 # 评论总数
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
        * _tid: 'tid-1'
          name: '中山大学'
          alias:  ['中大', 'Sun yat-san University']
        ...
      latest-messages-count: 199 # 最近24小时内的评论或回复数
      priority-messages: # 最多给回5条评论或回复
        * _id: 'xxxx'
          type: 'ips-msg' # 表示评论
          ipid: 'ipid-1' # interesting point id
          ipsid: 'ipsid-1 '# interesting point session id
          r-mid: void # the message replied to, only available when type either is ip-rpl or chat-rpl
          cid: 'cid-1' # chat id
          replies-count: 20 # 当type为ips-msg时才有的属性，表示回复数量！！！！！！！！
          original-content-type: 'text' # text | voice
          text-content: '快乐无极限' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
          voice-content: void 
          at-users: ['uid-1', 'uid-2', 'cid-1']
          create-time: '2013-02-04 12:03:02'
          send-by:
            _id: 'uid-1'
            username: 'Shin'
            gender: 'M'
            email: 'bossonchan@gmail.com'
            signature: '@+ is awesome!!'
            avatar: '/avatars/u/uid-1/1'
          is-anonymous: false # 是否匿名发表
          liked-by: ['uid-1'] # 点赞的用户
          reposts:
            * type: 'weibo' # 各个SNS，先暂时为weibo
              repost-id: 'xxxx'
              url: 'http://weibo.com/xxxx' # repost的地址
            ...
          is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
          origin-url: 'http://weibo.com/xxxx' # 原来的出处
          permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
        ...
      latest-messages: # 最多给回5条评论或者回复
        * _id: 'xxxx'
          type: 'ip-rpl' # 表示回复
          ipid: 'ipid-1' # interesting point id
          ipsid: 'ipsid-1 '# interesting point session id
          r-mid: 'mid-1 '# the message replied to, only available when type either is ip-rpl or chat-rpl
          cid: 'cid-1' # chat id
          original-content-type: 'text' # text | voice
          text-content: '快乐无极限' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
          voice-content: void 
          at-users: ['uid-1', 'uid-2', 'cid-1']
          create-time: '2013-02-04 12:03:02'
          send-by:
            _id: 'uid-1'
            username: 'Shin'
            gender: 'M'
            email: 'bossonchan@gmail.com'
            signature: '@+ is awesome!!'
            avatar: '/avatars/u/uid-1/1'
          is-anonymous: false # 是否匿名发表
          liked-by: ['uid-1'] # 点赞的用户
          reposts:
            * type: 'weibo' # 各个SNS，先暂时为weibo
              repost-id: 'xxxx'
              url: 'http://weibo.com/xxxx' # repost的地址
            ...
          is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
          origin-url: 'http://weibo.com/xxxx' # 原来的出处
          permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
        ...
    ...
retrieve-interesting-points-schema =
  type: 'object'
  additional-properties: false
  properties:
    lid: 
      description: 'location的id'
      type: 'string'
      required: true
    offset:
      description: '查询对象的偏移量'
      type: 'number'
      default: 1
      required: false
    count:
      description: '查询返回的数量'
      type: 'number'
      default: 10
      required: false

