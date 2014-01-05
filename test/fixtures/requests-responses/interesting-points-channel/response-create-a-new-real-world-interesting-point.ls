response-create-a-new-real-world-interesting-point =
  result: 'success'
  errors: []
  created-interesing-point:
    _id: 'xxxx'
    type: 'web' # web | real
    title: '无法阻挡的@+'
    content: '人类已经无法阻挡@+了'
    create-time: '2013-10-22 10:10:10'
    within-location:
      lid: 'lid-1'
      location-type: 'real' #!! derived from location
      # 以下五个属性是兴趣点所属location的位置信息
      longitude: 123
      latitude: 123
      altitude: 123
      radius: 10
      altitude-scope: 5
      at-position: # position的所有信息都内嵌在这里，没有单独的position document
        is-exist: true # default
        position-within-real-world-location: # 这里是兴趣点的绝对位置，与location无关
          longitude: 123
          latitude: 123
          altitude: 123
    created-by:
      _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1'
      signature: '@+ is awesome!!'
    is-private: false
    interesting-point-sessions-count: 20 
    shared-with: []
    watched-by: []
    liked-by: []
    pictures:
      * type: 'photo'
        url: '/user-pictures/uid-1/1'
        highlights: # 移动端上传的图片可以有亮点
          * offset:
              x: 123
              y: 123
            size:
              width: 123
              height: 123
          ...
      ...
    reposts:
      * type: 'weibo'
        repost-id: 'xxxx'
        url: 'http://weibo.com/xxxx'
      ...
    tags:
      * _id: 'tid-1'
        name: '中山大学'
        alias: ['SYSU']
      ...
    interesting-point-session:
      _id: 'ipsid-1'
      ipid: 'ipid-1'
      title: '无法阻挡的@+'
      create-time: '2013-08-18 23:11:09'
      created-by: 'uid-1'
      watched-by: ['uid-4', 'uid-5'] # is-private false才可以订阅。
      commented-by: ['uid-2', 'gid-3', 'uid-4', 'uid-8'] # 参与评论的人。 !! derived from message and interesting-point
      comments-count: 20
      liked-by: []
