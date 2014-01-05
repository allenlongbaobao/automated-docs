(function(){
  var responseLogin;
  responseLogin = {
    result: 'success',
    errors: [],
    user: {
      _id: 'uid-1',
      username: 'Shin',
      gender: 'M',
      email: 'bossonchan@gmail.com',
      avatar: '/avatars/u/uid-1/1',
      signature: '@+ is awesome!!',
      acceptedFriends: [{
        _id: 'uid-2',
        username: 'Bosson',
        gender: 'M',
        email: 'bossonchan@gmail.com',
        avatar: '/avatars/u/uid-1',
        signature: '@+ is awesome!!',
        status: 'online'
      }],
      rejectedFriends: [{
        _id: 'uid-3',
        username: 'iamshin'
      }],
      pendingFriends: [{
        _id: 'uid-4',
        username: 'iambosson'
      }],
      activeFriends: [{
        _id: 'uid-2',
        username: 'Bosson',
        gender: 'M',
        email: 'bossonchan@gmail.com',
        avatar: '/avatars/u/uid-1',
        signature: '@+ is awesome!!',
        status: 'online'
      }],
      acceptedCircle: [{
        _id: 'cid-1',
        name: '@+ 小组',
        creator: {
          _id: 'uid-3',
          username: 'iamshin',
          gender: 'M',
          email: 'bossonchan@gmail.com',
          avatar: '/avatars/u/uid-1/2',
          signature: '@+ is awesome!!',
          status: 'online'
        },
        createTime: '2013/03/03 12:00:32',
        avatar: '/avatars/c/cid-1/2',
        membersCount: 40
      }],
      rejectedCircle: [{
        _id: 'cid-1',
        name: '@+ 小组',
        creator: {
          _id: 'uid-3',
          username: 'iamshin',
          gender: 'M',
          email: 'bossonchan@gmail.com',
          avatar: '/avatars/u/uid-1/2',
          signature: '@+ is awesome!!',
          status: 'online'
        },
        createTime: '2013/03/03 12:00:32',
        avatar: '/avatars/c/cid-1/2',
        membersCount: 40
      }],
      pendingCircles: [{
        _id: 'cid-1',
        name: '@+ 小组'
      }],
      activeCircles: [{
        _id: 'cid-1',
        name: '@+ 小组',
        creator: {
          _id: 'uid-3',
          username: 'iamshin',
          gender: 'M',
          email: 'bossonchan@gmail.com',
          avatar: '/avatars/u/uid-1/2',
          signature: '@+ is awesome!!',
          status: 'online'
        },
        createTime: '2013/03/03 12:00:32',
        avatar: '/avatars/c/cid-1/2',
        membersCount: 40
      }]
    }
  };
}).call(this);
