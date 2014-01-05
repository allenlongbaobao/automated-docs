# this is this is req

h2 this is req

code:
    request-retrieve-nearby-interesting-points =
  longitude: 123
  latitude: 123
  altitude: 123


# this is this is req

h2 this is req

code:
    response-retrieve-nearby-interesting-points =
  result: "success"
  errors: []
  interesting-points-count: 10
  intersting-points:
    * _id: 'xxxx'
      type: 'web'
      title: '无法阻挡的@+'
      content: '人类已经无法阻挡@+了' # 以后可以是HTML内容
      create-time: '2013-08-18 23:11:09'
      within-location:
        lid: 'lid-1'
        location-type: 'real' #!! derived from location
        longitude: 123
        altitude: 123
        latitude: 123
        name: '中山大学体育馆' #!!duplicated from location
        at-position: # position的所有信息都内嵌在这里，没有单独的position document is-exist: true # default
          position-within-real-world-location:
            longitude: 123
            latitude: 123
            altitude: 123
      created-by: 
        _id: 'uid-1'
        username: '张三'
        gender: 'F'
        avatar: '/avatars/u/uid/1'
        signature: '我是张三'
      is-private: false
      interesting-point-sessions-count: 20 # 兴趣点会话数量
      shared-with: ['uid-2', 'uid-3']
      watched-by: ['uid-4', 'uid-5']
      at-users: []
      liked-by: []
      pictures:
        * type: 'photo' # snapshot | photo
          url: '/user-pictures/uid-1/1' # uid为creator的id，资源为：http://at-plus-server/pictures/uid/2
          highlights:
            offset:
              x: 123
              y: 123
            size:
              width: 123
              height: 123
        ...
      reposts:
        * type: 'weibo' # 各个SNS，先暂时为weibo
          repost-id: 'xxxx' # 在weibo上的id，可用于查询回复和转发
          url: 'http://weibo.com/xxxx' # repost的地址
        ...
      tags:
        * _tid: 'tid-1'
          name: '中山大学'
          alias:  ['中大', 'Sun yat-san University']
        ...
    ...
  


# this is this is req

h2 this is req

code:
    retrieve-nearby-interesting-points-schema =
  type: 'object'
  additional-properties: false
  properties:
    longitude:
      description: '当前位置经度'
      type: 'number'
      required: true
    latitude:
      description: '当前位置纬度'
      type: 'number'
      required: true
    altitude:
      description: '当前位置高度'
      type: 'number'
      required: true
  


