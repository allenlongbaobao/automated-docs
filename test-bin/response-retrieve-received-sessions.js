(function(){
  var responseRetrieveReceivedSessions;
  responseRetrieveReceivedSessions = {
    result: "success",
    errors: [],
    interestingPointSessions: [{
      _id: 'ipsid-1',
      ipid: 'ipid-1',
      title: '֧�ֺ����Ľ�������',
      createdBy: {
        _id: 'uid-1',
        username: 'Shin',
        gender: 'M',
        avatar: 'xxxx',
        signature: 'xxxx',
        email: 'xxxx'
      },
      createTime: '2013-10-11 12:00:13',
      watchedBy: ['uid-1', 'uid-2'],
      commentedBy: ['uid-1', 'uid-2'],
      commentsCount: 20,
      likedBy: ['uid-1'],
      interestingPoint: {
        _id: 'xxxx',
        type: 'web',
        title: '�޷��赲��@+',
        content: '�����Ѿ��޷��赲@+��',
        createTime: '2013-08-18 23:11:09',
        withinLocation: {
          lid: 'lid-1',
          locationType: 'web',
          url: 'http://some.com',
          name: '@+��ҳ',
          atPoisition: {
            isExist: true,
            positionWithinWebPage: {
              type: 'partial',
              mcs: [{
                id: '',
                path: 'body > div#some-id:eq(2) > div:eq(3) > div:eq(2)',
                html: "<table></table>",
                width: 324,
                height: 200,
                originTop: 123,
                originLeft: 234,
                ipOffset: {
                  top: 20,
                  left: 10,
                  width: 100,
                  height: 200
                }
              }],
              calculateTime: '2014-01-03 12:00:12.2345',
              userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.69 Safari/537.36"
            }
          }
        },
        createdBy: 'uid-1',
        isPrivate: false,
        interestingPointSessionsCount: 20,
        sharedWith: ['uid-2', 'uid-3'],
        watchedBy: ['uid-4', 'uid-5'],
        atUsers: [],
        likedBy: ['uid-1'],
        pictures: [{
          type: 'snapshot',
          url: '/user-pictures/uid-1/1'
        }],
        reposts: [{
          type: 'weibo',
          repostId: 'xxxx',
          url: 'http://weibo.com/xxxx'
        }],
        tags: [{
          _id: 'tid-1',
          name: '��ɽ��ѧ',
          alias: ['�д�', 'Sun yat-san University']
        }]
      }
    }]
  };
}).call(this);
