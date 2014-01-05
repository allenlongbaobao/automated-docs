# this is this is req

h2 this is req

code:
    response-push-user-presence-updated =
  _id: 'uid-1'
  username: 'zhangsan'
  gender: 'F'
  email: 'zhangsan@some.com'
  avatar: '/avatars/u/uid/1'
  signature: '@+ is awesome!'
  circles: ['cid-1', 'cid-2'] # 用户所参与的群组id
  status: 'online' # online | offline 即使用户状态切换为隐身，推送到其他用户也会变为offline


