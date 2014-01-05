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
