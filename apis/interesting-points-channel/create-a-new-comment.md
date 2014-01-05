# this is this is req

h2 this is req

code:

     request-create-a-new-comment =
  type: 'ips-msg' # 表示评论类型 
  ipid: 'ipid-1' # 兴趣点id
  ipsid: 'ipsid-1' # 要评论的兴趣点会话id
  original-content-type: 'text'
  text-content: '@+ is wonderful'
  voice-content: '/voice/vid-1'
  is-anonymous: false


# this is this is req

h2 this is req

code:

     response-create-a-new-comment =
  result: "success"
  errors: []
  created-comment:
    _id: 'mid-1'
    type: 'ip-msg'
    ipid: 'ipid-1'
    ipsid: 'ipsid-1'
    replies-count: 0 # 回复数量
    original-content-type: 'text'
    text-content: '@+ is wonderful'
    voice-content: '/voice/xxxx'
    at-users: ['uid-1', 'uid-2']
    create-time: '2013-02-05 12:00:00'
    send-by:
      _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1/1'
      signature: '@+ is awesome!!'
    is-anonymous: false # 如果为true，那么send-by为变为假数据：{_id: 'anonymous', username: '匿名', gender: 'U', email: '', avatar: '/avatars/s/anonymous/1', signature: ''}
    liked-by: [] # 点赞的用户
    reposts:
      * type: 'weibo'
        repost-id: 'xxxx'
        url: 'http://weibo.com/xxx'
      ...
    is-copied-from-third-part: false
    origin-url: 'http://weibo.com/2133453452'
    permlink: 'http://at-plus.com/xxx'


# this is this is req

h2 this is req

code:

     create-a-new-comment-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '信息的类型'
      type: 'string'
      enum: ['ips-msg', 'ip-rpl', 'chat-msg']
      required: true
    ipid:
      description: '评论所在兴趣点id'
      type: 'string'
      required: true
    ipsid:
      description: '评论所在兴趣点会话id'
      type: 'string'
      required: true
    original-content-type:
      description: '评论原始内容类型'
      type: 'string'
      enum: ['text', 'voice']
      required: true
    text-content:
      description: '评论文本内容'
      type: 'string'
      min-length: 1
      max-length: 140
      required: true
    voice-content:
      description: '评论语音链接'
      type: 'string'
      required: true
    is-anonymous:
      description: '是否匿名评论'
      type: 'boolean'
      required: true


