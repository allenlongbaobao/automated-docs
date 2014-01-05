(function(){
  var requestCreateANewRealWorldInterestingPoint;
  requestCreateANewRealWorldInterestingPoint = {
    createdInterestingPoint: {
      type: 'real',
      title: '无法阻挡的@+',
      content: '人类已经无法阻挡@+了',
      createTime: '2013-08-12 15:00:00',
      withinLocation: {
        type: 'real',
        atPosition: {
          isExist: true,
          positionWithinRealWorldLocation: {
            longitude: 123,
            latitude: 123,
            altitude: 123
          }
        }
      },
      isPrivate: true,
      sharedWith: ['uid-1', 'uid-2'],
      pictures: [{
        type: 'photo',
        url: '/user-pictures/uid-1/1',
        highlights: [{
          offset: {
            x: 123,
            y: 123
          },
          size: {
            width: 123,
            height: 123
          }
        }]
      }],
      tags: ['tid-1', 'tid-2']
    },
    selectedLocations: [{
      longitude: 123,
      altitude: 123,
      latitude: 123,
      address: '中国|广东省|番禺区|大学城|中山大学|体育馆'
    }]
  };
}).call(this);
