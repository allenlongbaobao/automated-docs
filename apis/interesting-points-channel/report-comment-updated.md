# this is this is req

h2 this is req

code:
    request-report-comment-updated =
  ipsid: 'ipsid-1'  # 注意：这里是会话id！！！而不是评论id！！！


# this is this is req

h2 this is req

code:
    response-report-comment-updated =
  result: "success"
  errors: []


# this is this is req

h2 this is req

code:
    report-comment-updated-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsid:
      description: '评论所属的会话id'
      type: 'string'
      required: true          


