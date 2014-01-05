request-create-a-new-web-interesting-point =
  type: 'web'
  title: '无法阻挡的@+'
  content: '人类已经无法阻挡@+了'
  within-location:
    lid: 'xxxx'
    location-type: 'web'
    url: 'http://at-plus.cn'
    name: '@+主页'
    at-position: 
      is-exist: true
      position-within-web-page:
        type: 'partial' # single | partial | multi
        mcs:
          * id: 'mcid-1'
            path: 'body > div#some-id:eq(2) > div:eq(2) > table#foo'
            html: "<table id='foo'> ... </table>"
            width: 324
            height: 200
            origin-top: 123
            origin-left: 234
            ip-offset:
              top: 20
              left: 10
              width: 200
              height: 100
          ...
        calculate-time: '2013-02-02 12:00:00'
        user-agent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
  is-private: true
  shared-with: ['uid-1', 'uid-2']
  pictures:
    * type: 'snapshot'
      url: '/user-pictures/uid-1/1'
    ...
  tags: ['tid-1', 'tid-2']
  
response-create-a-new-web-interesting-point =
  result: "success"
  errors: []
  created-interesting-point:
    _id: 'xxxx'
    type: 'web' # web | real
    title: '无法阻挡的@+'
    content: '好吧。。。'
    create-time: '2013-10-22 12:12:12'
    within-location:
      lid: 'lid-1'
      location-type: 'web' #!! derived from location
      url: 'http://at-plus.cn' # !!duplicated from location
      name: '@+主页' #!!duplicated from location
      at-position: # position的所有信息都内嵌在这里，没有单独的position document
        is-exist: true # default
        position-within-web-page:
          type: 'partial' # single | partial | multi
          mcs:
            * id: ''
              path: 'body > div#some-id:eq(2) > div:eq(3) > div:eq(2)'
              html: "<table></table>"
              width: 324
              height: 200
              origin-top: 123
              origin-left: 234
              ip-offset:
                top: 20
                left: 10
                width: 100
                height: 200
            ...
          calculate-time: '2014-01-03 12:00:12.2345'
          user-agent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
    created-by:
      _id: 'uid-1'
      username: 'Shin'
      gender: 'M'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1/1'
      signature: '@+ is awesome!!'
    is-private: false
    shared-with: []
    interesting-point-sessions-count: 1 # 兴趣点会话数，新建的兴趣点默认会产生一个新的会话
    comments-count: 0
    watched-by: []
    liked-by: []
    at-users: []
    pictures:
      * type: 'snapshoot' # snapshoot | photo
        url: '/user-pictures/uid-1/1' # uid为creator的id，资源为：http://at-plus-server/pictures/uid/2  
      ...
    reposts: []
    tags: ['tid-1', 'tid-2']
    interesting-point-session:
      _id: 'xxxx'
      title: '无法阻挡的@+'
      content: '好吧。。。'
      create-time: '2013-08-18 23:11:09'
      created-by:
        _id: 'uid-1'
        username: 'Shin'
        gender: 'M'
        email: 'bossonchan@gmail.com'
        avatar: '/avatars/u/uid-1/1'
        signature: '@+ is awesome!!'
      commented-by: [] # 参与评论的人。 !! derived from message and interesting-point
      watched-by: []
      liked-by: [] 
      comments-count: 0 # 评论数
create-a-new-web-interesting-point-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '兴趣点类型'
      type: 'string'
      enum: ['web', 'real']
      required: true
    title:
      description: '兴趣点标题'
      type: 'string'
      required: true
      min-length: 1
      max-length: 100
    content:
      description: '兴趣点内容'
      type: 'string'
      required: true
      min-length: 1
      max-length: 140
    within-location:
      description: '兴趣点所在网页信息'
      type: 'object'
      additional-properties: false
      required: true
      properties:
        lid:
          description: '兴趣点所在位置id'
          type: 'string'
          required: true
        location-type:
          description: '兴趣点所在位置类型'
          type: 'string'
          enum: ['web', 'real']
          required: true
        url:
          description: '兴趣点所在网页URL'
          type: 'string'
          required: true
        name:
          description: '兴趣点所在网页title'
          type: 'string'
          required: true
        at-position:
          description: '兴趣点位置'
          type: 'object'
          additional-properties: false
          properties:
            is-exist:
              description: '位置是否存在'
              type: 'boolean'
              required: true
            position-within-web-page:
              description: '网页中的位置信息'
              type: 'object'
              additional-properties: false
              properties:
                type:
                  description: '最小容器类型'
                  type: 'string'
                  enum: ['single', 'partial', 'multi']
                  required: true
                mcs:
                  description: '最小容器信息数组'
                  type: 'array'
                  required: true
                  min-items: 1
                  items:
                    description: '最小容器信息'
                    type: 'object'
                    additional-properties: false
                    properties:
                      id:
                        description: '最小容器id'
                        type: 'string'
                        required: true
                      path:
                        description: '最小容器获取路径'
                        type: 'string'
                        required: true
                      html:
                        description: '最小容器html代码段'
                        type: 'string'
                        required: true
                      width:
                        description: '最小容器宽度'
                        type: 'number'
                        required: true
                      height:
                        description: '最小容器高度'
                        type: 'number'
                        required: true
                      origin-top:
                        description: '最小容器原始顶部偏移量'
                        type: 'number'
                        required: true
                      origin-left:
                        description: '最小容器原始左边偏移量'
                        type: 'number'
                        required: true
                      ip-offset:
                        description: '兴趣点偏移量信息'
                        type: 'object'
                        additional-properties: false
                        required: true
                        properties:
                          top:
                            description: '顶部偏移'
                            type: 'number'
                            required: true
                          left:
                            description: '左边偏移'
                            type: 'number'
                            required: true
                          width:
                            description: '宽度'
                            type: 'number'
                            required: true
                          height:
                            description: '高度'
                            type: 'number'
                            required: true
                calculate-time:
                  description: '计算时间'
                  type: 'string'
                  required: true
                user-agent:
                  description: '客户端请求头部'
                  type: 'string'
                  required: true
    is-private:
      description: '兴趣点是否私有'
      type: 'boolean'
      required: true
    shared-with:
      description: '兴趣点分享的用户'
      type: 'array'
      required: true
      items:
        description: '用户id'
        type: 'string'
    pictures:
      description: '兴趣点快照'
      type: 'array'
      required: true
      items:
        description: '图片信息'
        type: 'object'
        additional-properties: false
        properties:
          type:
            description: '图片类型'
            type: 'string'
            enum: ['snapshot', 'photo']
            required: true
          url:
            description: '图片链接'
            type: 'string'
            required: true
    tags:
      description: '兴趣点标签'
      type: 'array'
      required: true
      items:
        description: '标签id'
        type: 'string'
