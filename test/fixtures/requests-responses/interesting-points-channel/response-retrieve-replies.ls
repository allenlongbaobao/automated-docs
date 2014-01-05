response-retrieve-replies =
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
    ...
