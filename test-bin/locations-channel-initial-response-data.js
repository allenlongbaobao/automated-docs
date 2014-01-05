(function(){
  var locationInitialResponseData;
  locationInitialResponseData = {
    locations: [{
      _id: 'lid-1',
      type: 'web',
      name: '@+主页',
      isExisting: true,
      isInternal: false,
      interestingPointsCount: 20,
      duration: {
        from: '2013-10-22 12:12:12',
        to: '2013-10-22 12:12:12'
      },
      watchedBy: ['uid-1'],
      urls: ['http://some.com', 'http://some.com/index.html']
    }],
    inexistenceLocations: ['http://www.locations-not-in-db.com']
  };
}).call(this);
