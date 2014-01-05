# this is this is req

h2 this is req

code:

     request-retrieve-interesting-point-sessions =
  ipid: 'ipid-1'
  last-access-time: '2013-01-01 12:12:12'
  skip: 0
  limit: 10


# this is this is req

h2 this is req

code:

     response-retrieve-interesting-point-sessions =
  result: "success"
  errors: []
  interesting-point-sessions:
    * _id: 'ipsid-1' # interesting point session id
      ipid: 'ipid-1' # interesting point id
      title: '支持恒大的进来！！'
      created-by: 'uid-1'
      create-time: '2013-10-11 12:00:13'
      watched-by: ['uid-1', 'uid-2'] # 关注会话的用户
      commented-by: ['uid-1', 'uid-2'] # 评论会话的用户
      comments-count: 20
      liked-by: ['uid-1']
    ...


# this is this is req

h2 this is req

code:

     retrieve-interesting-point-sessions-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '兴趣点id'
      type: 'string'
      required: true
    last-access-time:
      description: '最后访问时间，用于查询最新、未读记录'
      type: 'string'
      default: ''
    skip:
      description: '查询对象偏移量'
      type: 'number'
      default: 1
    limit:
      description: '查询对象数量'
      type: 'number'
      default: 10
    sort:
      description: '时间排序方式'
      type: 'number'
      default: 1


