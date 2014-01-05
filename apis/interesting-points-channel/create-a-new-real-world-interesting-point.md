# this is this is req

h2 this is req

code:
    request-create-a-new-real-world-interesting-point =
  created-interesting-point:
    type: 'real'
    title: '无法阻挡的@+'
    content: '人类已经无法阻挡@+了'
    create-time: '2013-08-12 15:00:00'
    within-location: # 这里是当前创建兴趣点时的位置信息
      type: 'real'
      at-position: # 兴趣点在
        is-exist: true
        position-within-real-world-location:
          longitude: 123
          latitude: 123
          altitude: 123
    is-private: true
    shared-with: ['uid-1', 'uid-2']
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
    tags: ['tid-1', 'tid-2']
  selected-locations: # 用于更新服务端的location，并且服务端会从这个数组中选出兴趣点所属的location
    * longitude: 123
      altitude: 123
      latitude: 123
      address: '中国|广东省|番禺区|大学城|中山大学|体育馆'
    ...


# this is this is req

h2 this is req

code:
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


# this is this is req

h2 this is req

code:
    create-a-new-real-world-interesting-point-schema =
  type: 'object'
  additional-properties: false
  properties:
    created-interesting-point:
      type: 'object'
      description: '新建兴趣点的基本数据'
      additional-properties: false
      required: true
      properties:
        type:
          description: '兴趣点类型'
          type: 'string'
          required: true
          enum: ['web', 'real']
        title:
          description: '兴趣点标题'
          type: 'string'
          required: true
        content:
          description: '兴趣点内容'
          type: 'string'
          required: true
        within-location:
          description: '所在的位置信息'
          type: 'object'
          additional-properties: false
          required: true
          properties:
            type:
              description: '位置类型'
              type: 'string'
              enum: ['web', 'real']
              required: true
            at-position:
              description: '兴趣点的绝对位置信息'
              type: 'object'
              additional-properties: false
              required: true
              properties:
                is-exist:
                  description: '位置是否存在'
                  type: 'boolean'
                  required: true
                position-within-real-world-location:
                  description: '真实世界位置信息'
                  type: 'object'
                  additional-properties: false
                  required: true
                  properties:
                    longitude:
                      description: '经度'
                      type: 'number'
                      required: true
                    latitude:
                      description: '纬度'
                      type: 'number'
                      required: true
                    altitude:
                      description: '高度'
                      type: 'number'
                      required: true
        is-private:
          description: '兴趣点是否是私有的'
          type: 'boolean'
          required: true
        shared-with:
          description: '兴趣点分享用户'
          type: 'array'
          required: true
          item:
            description: '用户id'
            type: 'string'
        pictures:
          description: '兴趣点对应的图片'
          type: 'array'
          required: true
          min-items: 1
          items:
            description: '图片信息'
            type: 'object'
            additional-properties: false
            properties:
              type:
                description: '图片类型'
                type: 'string'
                required: true
                enum: ['photo', 'snapshot']
              url:
                description: '图片地址'
                type: 'string'
                required: true
              highlights:
                description: '图片亮点数组'
                type: 'array'
                required: true
                items:
                  description: '亮点信息'
                  type: 'object'
                  additional-properties: false
                  required: true
                  properties:
                    offset:
                      description: '亮点相对图片的偏移量'
                      type: 'object'
                      additional-properties: false
                      required: true
                      properties:
                        x:
                          description: '偏移x轴的值'
                          type: 'number'
                          required: true
                        y:
                          description: '偏移y轴的值'
                          type: 'number'
                          required: true
                    size:
                      description: '亮点大小信息'
                      type: 'object'
                      additional-properties: false
                      required: true
                      properties:
                        width:
                          description: '宽度'
                          type: 'number'
                          required: true
                        height:
                          description: '高度'
                          type: 'number'
                          required: true
        tags:
          description: '兴趣点标签'
          type: 'array'
          required: true
          items:
            description: '标签id'
            type: 'string'
    selected-locations:
      type: 'array'
      description: '用户选择的地理位置'
      required: true
      min-items: 1
      items:
        type: 'object'
        description: '每个地理位置的信息'
        additional-properties: false
        required: true
        properties:
          longitude:
            description: '经度'
            type: 'number'
            required: true
          latitude:
            description: '纬度'
            type: 'number'
            required: true
          altitude:
            description: '高度'
            type: 'number'
            required: true
          address:
            description: '地理位置的地址名称'
            type: 'string'
            required: true


