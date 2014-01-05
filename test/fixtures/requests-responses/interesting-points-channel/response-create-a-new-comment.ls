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
