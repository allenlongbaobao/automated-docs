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
