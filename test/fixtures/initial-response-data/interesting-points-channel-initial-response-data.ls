interesting-points-response-initial-data =
  # 热门
  hots-interesting-points: # 默认给出8个
    * _id: 'ipid-1'
      type: 'web'
      title: '无法阻挡的@+'
      content: '人类已经无法阻挡@+了'
      create-time: '2013-08-09 12:23:33'
      within-location:
        lid: 'lid-1'
        location-type: 'web'
        url: 'http://some.com'
        at-position:
          is-exist: true
          position-within-web-page:
            related-text-content: '人们可以在任何网页上自由评论，吐槽'
            related-image: 'http://some.com/images/1.jpg'
            pin-point-dom: '.content div span 0'
            offset: {x: '10em', y: '15em'}
            size: {width: '20em', height: '30em'}
      created-by: ['uid-2']
      is-private: false
      shard-with: ['uid-2', 'uid-4']
      watched-by: ['uid-3', 'uid-5']
      pictures:
        * type: 'snapshot'
          url: '/user-pictures/uid-1/1'
        ...
      reposts:
        * type: 'weibo'
          repost-id: 'xxxxx'
          url: 'http://weibo.com/xxxx'
        ...
      tags: ['tid-1', 'tid-2']
    ...
  # 圈子
  circles-interesting-points: # 默认给出8个
    * _id: 'ipid-1'
      type: 'web'
      title: '无法阻挡的@+'
      content: '人类已经无法阻挡@+了'
      create-time: '2013-08-09 12:23:33'
      within-location:
        lid: 'lid-1'
        location-type: 'web'
        url: 'http://some.com'
        at-position:
          is-exist: true
          position-within-web-page:
            related-text-content: '人们可以在任何网页上自由评论，吐槽'
            related-image: 'http://some.com/images/1.jpg'
            pin-point-dom: '.content div span 0'
            offset: {x: '10em', y: '15em'}
            size: {width: '20em', height: '30em'}
      created-by: ['uid-2']
      is-private: false
      shard-with: ['uid-2', 'uid-4']
      watched-by: ['uid-3', 'uid-5']
      pictures:
        * type: 'snapshot'
          url: '/user-pictures/uid-1/1'
        ...
      reposts:
        * type: 'weibo'
          repost-id: 'xxxxx'
          url: 'http://weibo.com/xxxx'
        ...
      tags: ['tid-1', 'tid-2']
    ...

  # 我的
  created-interesting-points: # 我创建的兴趣点，默认给出4个
    * _id: 'ipid-1'
      type: 'web'
      title: '无法阻挡的@+'
      content: '人类已经无法阻挡@+了'
      create-time: '2013-08-09 12:23:33'
      within-location:
        lid: 'lid-1'
        location-type: 'web'
        url: 'http://some.com'
        at-position:
          is-exist: true
          position-within-web-page:
            related-text-content: '人们可以在任何网页上自由评论，吐槽'
            related-image: 'http://some.com/images/1.jpg'
            pin-point-dom: '.content div span 0'
            offset: {x: '10em', y: '15em'}
            size: {width: '20em', height: '30em'}
      created-by: ['uid-2']
      is-private: false
      shard-with: ['uid-2', 'uid-4']
      watched-by: ['uid-3', 'uid-5']
      pictures:
        * type: 'snapshot'
          url: '/user-pictures/uid-1/1'
        ...
      reposts:
        * type: 'weibo'
          repost-id: 'xxxxx'
          url: 'http://weibo.com/xxxx'
        ...
      tags: ['tid-1', 'tid-2']
    ...
  attended-interesting-points: # 我参与过的兴趣点（评论，回复过），默认给出4个
    * _id: 'ipid-1'
      type: 'web'
      title: '无法阻挡的@+'
      content: '人类已经无法阻挡@+了'
      create-time: '2013-08-09 12:23:33'
      within-location:
        lid: 'lid-1'
        location-type: 'web'
        url: 'http://some.com'
        at-position:
          is-exist: true
          position-within-web-page:
            related-text-content: '人们可以在任何网页上自由评论，吐槽'
            related-image: 'http://some.com/images/1.jpg'
            pin-point-dom: '.content div span 0'
            offset: {x: '10em', y: '15em'}
            size: {width: '20em', height: '30em'}
      created-by: ['uid-2']
      is-private: false
      shard-with: ['uid-2', 'uid-4']
      watched-by: ['uid-3', 'uid-5']
      pictures:
        * type: 'snapshot'
          url: '/user-pictures/uid-1/1'
        ...
      reposts:
        * type: 'weibo'
          repost-id: 'xxxxx'
          url: 'http://weibo.com/xxxx'
        ...
      tags: ['tid-1', 'tid-2']
    ...
  watch-interesting-points: # 我关注的兴趣点，默认给出4个
    * _id: 'ipid-1'
      type: 'web'
      title: '无法阻挡的@+'
      content: '人类已经无法阻挡@+了'
      create-time: '2013-08-09 12:23:33'
      within-location:
        lid: 'lid-1'
        location-type: 'web'
        url: 'http://some.com'
        at-position:
          is-exist: true
          position-within-web-page:
            related-text-content: '人们可以在任何网页上自由评论，吐槽'
            related-image: 'http://some.com/images/1.jpg'
            pin-point-dom: '.content div span 0'
            offset: {x: '10em', y: '15em'}
            size: {width: '20em', height: '30em'}
      created-by: ['uid-2']
      is-private: false
      shard-with: ['uid-2', 'uid-4']
      watched-by: ['uid-3', 'uid-5']
      pictures:
        * type: 'snapshot'
          url: '/user-pictures/uid-1/1'
        ...
      reposts:
        * type: 'weibo'
          repost-id: 'xxxxx'
          url: 'http://weibo.com/xxxx'
        ...
      tags: ['tid-1', 'tid-2']
    ...

  # 消息 
  unread-mentioned-messages-count: 20 # 未读@消息
  unread-sessions-updated-messages-count: 20 # 未读会话更新消息
  unread-commented-messages-count: 20 # 未读评论消息
  unread-replied-messages-count: 20 # 未读回复消息
