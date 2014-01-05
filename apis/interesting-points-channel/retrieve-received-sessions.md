# this is this is req

h2 this is req

code:

     request-retrieve-received-sessions =
  from: 'uid-1'
  type: 'created'
  limit: 10
  skip: 0
  unread: true


# this is this is req

h2 this is req

code:

     response-retrieve-received-sessions =
  result: "success"
  errors: []
  interesting-point-sessions:
    * _id: 'ipsid-1' # interesting point session id
      ipid: 'ipid-1' # interesting point id
      title: '֧�ֺ����Ľ�������'
      created-by:
        _id: 'uid-1'
        username: 'Shin'
        gender: 'M'
        avatar: 'xxxx'
        signature: 'xxxx'
        email: 'xxxx'
      create-time: '2013-10-11 12:00:13'
      watched-by: ['uid-1', 'uid-2'] # ��ע�Ự���û�
      commented-by: ['uid-1', 'uid-2'] # ���ۻỰ���û�
      comments-count: 20
      liked-by: ['uid-1']
      interesting-point: # �Ự������Ȥ��
        _id: 'xxxx'
        type: 'web'
        title: '�޷��赲��@+'
        content: '�����Ѿ��޷��赲@+��' # �Ժ�������HTML����
        create-time: '2013-08-18 23:11:09'
        within-location:
          lid: 'lid-1'
          location-type: 'web' #!! derived from location
          url: 'http://some.com' # !!duplicated from location
          name: '@+��ҳ' #!!duplicated from location
          at-poisition: # position��������Ϣ����Ƕ�����û�е�����position document
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
        created-by: 'uid-1'
        is-private: false
        interesting-point-sessions-count: 20 # ��Ȥ���Ự������
        shared-with: ['uid-2', 'uid-3']
        watched-by: ['uid-4', 'uid-5']
        at-users: []
        liked-by: ['uid-1']
        pictures:
          * type: 'snapshot' # snapshot | photo
            url: '/user-pictures/uid-1/1' # uidΪcreator��id����ԴΪ��http://at-plus-server/pictures/uid/2
          ...
        reposts:
          * type: 'weibo' # ����SNS������ʱΪweibo
            repost-id: 'xxxx' # ��weibo�ϵ�id�������ڲ�ѯ�ظ���ת��
            url: 'http://weibo.com/xxxx' # repost�ĵ�ַ
          ...
        tags:
          * _id: 'tid-1'
            name: '��ɽ��ѧ'
            alias:  ['�д�', 'Sun yat-san University']
          ...
    ...



# this is this is req

h2 this is req

code:

     retrieve-received-sessions-schema =
  type: 'object'
  additional-properties: false
  properties:
    type:
      description: '表示类型，可以是创建的兴趣点，也可以是关注的兴趣点'
      type: 'string'
      enum: ['all', 'watching', 'created']
      default: 'all'
      required: false
    limit:
      description: '查询数量'
      type: 'number'
      default: 10
      required: false
    skip:
      description: '查询偏移量'
      type: 'number'
      default: 0
      required: false
    from:
      description: '消息发送者的id'
      type: 'string'
      required: false
    unread:
      description: '是否只返回未读'
      type: 'boolean'
      default: false
      required: false


