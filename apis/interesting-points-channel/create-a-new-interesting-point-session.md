# this is this is req

h2 this is req

code:

     request-create-a-new-interesting-point-session =
  ipid: 'ipid-1'
  title: '支持恒大的进来！！'


# this is this is req

h2 this is req

code:

     response-create-a-new-interesting-point-session =
  result: "success"
  errors: []
  created-interesting-point-session:
    _id: 'ipsid-1'
    ipid: 'ipid-1'
    title: '支持恒大的进来！！！'
    created-by:
      _id: 'uid-1'
      gender: 'M'
      username: 'Shin'
      email: 'bossonchan@gmail.com'
      avatar: '/avatars/u/uid-1'
      signature: '@+ is awesome!!'
    create-time: '2013-10-24 12:00:00'
    watched-by: []
    commented-by: []
    liked-by: []
    comments-count: 0


# this is this is req

h2 this is req

code:

     create-a-new-interesting-point-session-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipid:
      description: '新建的会话所属的兴趣点id'
      type: 'string'
      required: true
    title:
      description: '新建会话的标题'
      type: 'string'
      required: true


