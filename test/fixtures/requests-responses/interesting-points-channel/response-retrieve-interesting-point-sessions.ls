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
