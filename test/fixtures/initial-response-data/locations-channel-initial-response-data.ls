location-initial-response-data =
  locations:
    * _id: 'lid-1'
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
    ...
  inexistence-locations: ['http://www.locations-not-in-db.com']
    # retrieved-html: '<html>...</html>'
    # web-page-snapshot: '/web-page-snapshot/lid-1'
    # interesting-points :
    #   * _id: 'ipid-1'
    #     type: 'web' # web | real
    #     title: '无法阻挡的@+'
    #     content: '人类已经无法阻挡@+了' # 以后可以是HTML内容
    #     create-time: '2013-08-18 23:11:09'
    #     within-location:
    #       at-position:
    #         is-exist: true # default
    #         position-within-web-page:
    #           type: 'partial' # single | partial | multi
    #           mcs:
    #             * id: 'mcid'
    #               path: 'body > div#some-id:eq(2) > div:eq(3) > div:eq(2)'
    #               html: "<table></table>"
    #               width: 324
    #               height: 200
    #               origin-top: 123
    #               origin-left: 234
    #               ip-offset:
    #                 top: 20
    #                 left: 10
    #                 width: 100
    #                 height: 200
    #             ...
    #           calculate-time: '2014-01-03 12:00:12.2345'
    #           user-agent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
    #     created-by: 
    #       * _id: 'uid-1'
    #         username: '张三'
    #         gender: 'F'
    #         avatar: '/avatars/u/uid/1'
    #         signature: '我是张三'
    #       ...
    #     is-private: false # default 当true时，只有shared-with的人才能够看到
    #     shared-with: ['uid-2', 'uid-3']
    #     watched-by: ['uid-4', 'uid-5']
    #     at-users: ['uid-1']
    #     pictures:
    #       * type: 'snapshot' # snapshot | photo
    #         url: '/user-pictures/uid-1/1' # uid为creator的id，资源为：http://at-plus-server/pictures/uid/2
    #       ...
    #     reposts:
    #       * type: 'weibo' # 各个SNS，先暂时为weibo
    #         repost-id: 'xxxx' # 在weibo上的id，可用于查询回复和转发
    #         url: 'http://weibo.com/xxxx' # repost的地址
    #       ...
    #     tags:
    #       * _id: 'tid-1'
    #         name: '中山大学'
    #         alias:  ['中大', 'Sun yat-san University']
    #       ...
    #     interesting-point-sessions-count: 20 # 总的会话个数
    #     interesting-point-sessions: # 默认给回10个？
    #       * _id: 'ipsid-1'
    #         ipid: 'ipid'
    #         title: '支持恒大的进来！！'
    #         created-by: 'uid-1'
    #         create-time: '2013-10-11 12:00:13'
    #         watched-by: ['uid-1', 'uid-2'] # 关注会话的用户
    #         commented-by: ['uid-1', 'uid-2'] # 评论会话的用户
    #         comments-count: 200 # 评论的数量
    #         liked-by: ['uid-1', 'uid-2'] # 点赞的用户
    #       ...
    #     #
    #     # 下面是交互设计上所需要的数据
    #     latest-messages-count: 199 # 最近24小时内的评论或回复数
    #     priority-messages: # 最多给回5条评论或回复
    #       * _id: 'xxxx'
    #         type: 'ips-msg' # 表示评论
    #         ipid: 'ipid-1' # interesting point id
    #         ipsid: 'ipsid-1 '# interesting point session id
    #         r-mid: void # the message replied to, only available when type either is ip-rpl or chat-rpl
    #         cid: 'cid-1' # chat id
    #         replies-count: 20 # 当type为ips-msg时才有的属性，表示回复数量！！！！！！！！
    #         original-content-type: 'text' # text | voice
    #         text-content: '快乐无极限' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    #         voice-content: void 
    #         at-users: ['uid-1', 'uid-2', 'cid-1']
    #         create-time: '2013-02-04 12:03:02'
    #         send-by:
    #           _id: 'uid-1'
    #           username: 'Shin'
    #           gender: 'M'
    #           email: 'bossonchan@gmail.com'
    #           signature: '@+ is awesome!!'
    #           avatar: '/avatars/u/uid-1/1'
    #         is-anonymous: false # 是否匿名发表
    #         liked-by: ['uid-1'] # 点赞的用户
    #         reposts:
    #           * type: 'weibo' # 各个SNS，先暂时为weibo
    #             repost-id: 'xxxx'
    #             url: 'http://weibo.com/xxxx' # repost的地址
    #           ...
    #         is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    #         origin-url: 'http://weibo.com/xxxx' # 原来的出处
    #         permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
    #       ...
    #     latest-messages: # 最多给回5条评论或者回复
    #       * _id: 'xxxx'
    #         type: 'ip-rpl' # 表示回复
    #         ipid: 'ipid-1' # interesting point id
    #         ipsid: 'ipsid-1 '# interesting point session id
    #         r-mid: 'mid-1 '# the message replied to, only available when type either is ip-rpl or chat-rpl
    #         cid: 'cid-1' # chat id
    #         original-content-type: 'text' # text | voice
    #         text-content: '快乐无极限' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    #         voice-content: void 
    #         at-users: ['uid-1', 'uid-2', 'cid-1']
    #         create-time: '2013-02-04 12:03:02'
    #         send-by:
    #           _id: 'uid-1'
    #           username: 'Shin'
    #           gender: 'M'
    #           email: 'bossonchan@gmail.com'
    #           signature: '@+ is awesome!!'
    #           avatar: '/avatars/u/uid-1/1'
    #         is-anonymous: false # 是否匿名发表
    #         liked-by: ['uid-1'] # 点赞的用户
    #         reposts:
    #           * type: 'weibo' # 各个SNS，先暂时为weibo
    #             repost-id: 'xxxx'
    #             url: 'http://weibo.com/xxxx' # repost的地址
    #           ...
    #         is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    #         origin-url: 'http://weibo.com/xxxx' # 原来的出处
    #         permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
    #       ...
    #   ...
