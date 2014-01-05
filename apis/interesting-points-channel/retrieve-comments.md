# this is this is req

h2 this is req

code:

     request-retrieve-comments =
  ipsid: 'xxxx'
  last-access-time: '2013-01-01 12:12:12'
  skip: 0
  limit: 10


# this is this is req

h2 this is req

code:

     response-retrieve-comments =
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
    ...


# this is this is req

h2 this is req

code:

     retrieve-comments-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsid:
      description: '查询的会话id'
      type: 'string'
      required: true
    last-access-time:
      description: '最后访问时间，用于查询最新、未读记录'
      type: 'string'
      deafult: ''
    skip:
      description: '查询对象的偏移量'
      type: 'number'
      default: 1
    limit:
      description: '查询返回的数量'
      type: 'number'
      default: 10
    sort:
      description: '时间排序的方式'
      type: 'number'
      default: 1


