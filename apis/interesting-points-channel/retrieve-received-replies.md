# this is this is req

h2 this is req

code:
    request-retrieve-received-replies =
  from: 'uid-1' # 如果为空，则获取所有用户的
  limit: 10
  skip: 0
  unread: true


# this is this is req

h2 this is req

code:
    response-retrieve-received-replies =
  result: "success"
  errors: []
  replies:
    * _id: 'mid-1'
      ipid: 'ipid-1'
      ipsid: 'ipsid-1'
      r-mid: 'mid-1'
      original-content-type: 'text'
      text-content: '快乐无极限'
      voice-content: 'voice/vid-1'
      at-users: ['uid-1', 'uid-2', 'uid-3']
      create-time: '2013-02-04 12:00:00'
      send-by:
        _id: 'uid-1'
        username: 'Shin'
        gender: 'M'
        email: 'bossonchan@gmail.com'
        avatar: '/avatars/u/uid-1/1'
        signature: '@+ is awesome !!'
      is-anonymous: false # 若为true，send-by为假数据
      liked-by: ['uid-1', 'uid-2']
      reposts:
        * type: 'weibo'
          repost-id: 'xxx'
          url: 'http://weibo.com/xxxx'
        ...
      is-copied-from-third-part: false
      origin-url: 'http://weibo.com/xxxx'
      permlink: 'http://at-plus.com/xxxx'
      comment: # 回复所在的评论
        _id: 'mid-1'
        ipid: 'ipid-1'
        ipsid: 'ipsid-1'
        replies-count: 20 # 回复数量
        original-content-type: 'text'
        text-content: '快乐无极限'
        voice-content: 'voice/vid-1'
        at-users: ['uid-1', 'uid-2', 'uid-3']
        create-time: '2013-02-04 12:00:00'
        send-by: 'uid-1' # 创建者就是当前用户
        is-anonymous: false
        liked-by: ['uid-1']
        reposts:
          * type: 'weibo'
            repost-id: 'xxx'
            url: 'http://weibo.com/xxxx'
          ...
        is-copied-from-third-part: false
        origin-url: 'http://weibo.com/xxxx'
        permlink: 'http://at-plus.com/xxxx'
    ...


# this is this is req

h2 this is req

code:
    retrieve-received-replies-schema =
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
      description: '消息发送者的id'
      type: 'sring'
      required: false
    unread:
      description: '是否只返回未读'
      type: 'boolean'
      default: false
      required: false

