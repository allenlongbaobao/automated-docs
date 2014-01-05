messages =
  * _id: 'cid-1'
    type: 'ips-msg' # ips-msg | ip-rpl | chat-msg
    ipid: 'ipid-1' # interesting point id
    ipsid: 'ipsid-1'# interesting point session id
    replies-count: 5 # 当type为ips-msg时才有的属性，表示回复数量！！！！！！！！
    original-content-type: 'text' # text | voice
    text-content: '快乐无极限 @baixin' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    voice-content: '/voice/0'
    at-users: []
    create-time: new Date((new Date).get-time! - 24 * 3600 * 1000)
    send-by: 'uid-2'
    is-anonymous: false # 是否匿名发表
    liked-by: [] # 点赞的用户
    reposts: []
    is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    origin-url: 'http://weibo.com/xxxx' # 原来的出处
    permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
  * _id: 'rid-1'
    type: 'ip-rpl' # ips-msg | ip-rpl | chat-msg
    ipid: 'ipid-1' # interesting point id
    ipsid: 'ipsid-1'# interesting point session id
    r-mid: 'cid-1'
    original-content-type: 'text' # text | voice
    text-content: '快乐无极限 @baixin' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    voice-content: '/voice/0'
    at-users: []
    create-time: new Date((new Date).get-time! - 25 * 3600 * 1000)
    send-by: 'uid-3'
    is-anonymous: false # 是否匿名发表
    liked-by: [] # 点赞的用户
    reposts: []
    is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    origin-url: 'http://weibo.com/xxxx' # 原来的出处
    permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
  * _id: 'rid-2'
    type: 'ip-rpl' # ips-msg | ip-rpl | chat-msg
    ipid: 'ipid-1' # interesting point id
    ipsid: 'ipsid-1'# interesting point session id
    r-mid: 'cid-1'
    original-content-type: 'text' # text | voice
    text-content: '快乐无极限 @baixin' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    voice-content: '/voice/0'
    at-users: []
    create-time: new Date((new Date).get-time! - 12 * 3600 * 1000)
    send-by: 'uid-3'
    is-anonymous: false # 是否匿名发表
    liked-by: [] # 点赞的用户
    reposts: []
    is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    origin-url: 'http://weibo.com/xxxx' # 原来的出处
    permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
  * _id: 'rid-3'
    type: 'ip-rpl' # ips-msg | ip-rpl | chat-msg
    ipid: 'ipid-1' # interesting point id
    ipsid: 'ipsid-1'# interesting point session id
    r-mid: 'cid-1'
    original-content-type: 'text' # text | voice
    text-content: '快乐无极限 @baixin' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    voice-content: '/voice/0'
    at-users: []
    create-time: new Date((new Date).get-time! - 12 * 3600 * 1000)
    send-by: 'uid-3'
    is-anonymous: false # 是否匿名发表
    liked-by: [] # 点赞的用户
    reposts: []
    is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    origin-url: 'http://weibo.com/xxxx' # 原来的出处
    permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
  * _id: 'rid-4'
    type: 'ip-rpl' # ips-msg | ip-rpl | chat-msg
    ipid: 'ipid-1' # interesting point id
    ipsid: 'ipsid-1'# interesting point session id
    r-mid: 'cid-1'
    original-content-type: 'text' # text | voice
    text-content: '快乐无极限 @baixin' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    voice-content: '/voice/0'
    at-users: []
    create-time: new Date((new Date).get-time! - 25 * 3600 * 1000)
    send-by: 'uid-4'
    is-anonymous: false # 是否匿名发表
    liked-by: [] # 点赞的用户
    reposts: []
    is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    origin-url: 'http://weibo.com/xxxx' # 原来的出处
    permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
  * _id: 'rid-5'
    type: 'ip-rpl' # ips-msg | ip-rpl | chat-msg
    ipid: 'ipid-1' # interesting point id
    ipsid: 'ipsid-1'# interesting point session id
    r-mid: 'cid-1'
    original-content-type: 'text' # text | voice
    text-content: '快乐无极限 @baixin' # When origin content is voice, it will be interpreted text. May be HTML for colorful messages.
    voice-content: '/voice/0'
    at-users: []
    create-time: new Date((new Date).get-time! - 12 * 3600 * 1000)
    send-by: 'uid-4'
    is-anonymous: false # 是否匿名发表
    liked-by: [] # 点赞的用户
    reposts: []
    is-copied-from-third-part: false # 用户在@+之外的平台上发送的消息，被我们汇集到@+时，此值为true
    origin-url: 'http://weibo.com/xxxx' # 原来的出处
    permlink: 'http://at-plus.com/xxxx' # 可收藏的永久链接
  ...
