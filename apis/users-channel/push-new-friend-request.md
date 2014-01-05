response-push-new-friend-request =
  _id: 'uid-1'
  username: '小东'
  gender: 'F' # M | F | U (不确定)
  emails: # emails[0]为主email
    'xiaodong@some.com'
    ... 
  avatars: # avatars[0]是当前使用的。
    '/avatars/u/uid-1/2' # u开头是用户上传的，资源为：http://at-plus-server/avatars/u/uid/2
    '/avatars/u/uid-1/1' # 资源为：http://at-plus-server/avatars/u/uid/2
    '/avatars/s/1'     # s开头是系统提供的资源为：http://at-plus-server/avatars/s/1
  signatures: # signatures[0]为当前使用的
    '彪悍的人生不需要解释'
    ... 
  status: 'online'

