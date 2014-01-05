request-retrieve-received-comments =
  from: 'uid-1'
  type: 'watching'
  limit: 10
  skip: 0
  unread: true
response-retrieve-received-comments =
  result: "success"
  errors: []
  comments:
    * _id: 'mid-1'
      ipid: 'ipid-1'
      ipsid: 'ipsid-1'
      replies-count: 20 # 回复数量
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
      liked-by: ['uid-1']
      reposts:
        * type: 'weibo'
          repost-id: 'xxx'
          url: 'http://weibo.com/xxxx'
        ...
      is-copied-from-third-part: false
      origin-url: 'http://weibo.com/xxxx'
      permlink: 'http://at-plus.com/xxxx'
      interesting-point-session: # 评论所在的会话数据
        _id: 'ipsid-1' # interesting point session id
        ipid: 'ipid-1' # interesting point id
        title: '支持恒大的进来！！'
        created-by: 'uid-1'
        create-time: '2013-10-11 12:00:13'
        watched-by: ['uid-1', 'uid-2'] # 关注会话的用户
        commented-by: ['uid-1', 'uid-2'] # 评论会话的用户
        comments-count: 20
        liked-by: ['uid-1']
    ...
retrieve-received-comments-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '列表类型'
      type: 'string'
      enum: ['all', 'watching', 'created']
      default: 'all'
      required: false
    limit:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false
    skip:
      description: '查询偏移量'
      type: 'number'
      default: 0
      required: false
    from:
      description: '消息发送者的id'
      type: 'string'
      required: false
    unread:
      description: '是否只返回未读'
      type: 'boolean'
      default: false
      required: false
