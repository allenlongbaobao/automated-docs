request-report-comment-updated =
  ipsid: 'ipsid-1'  # 注意：这里是会话id！！！而不是评论id！！！
response-report-comment-updated =
  result: "success"
  errors: []
report-comment-updated-schema =
  type: 'object'
  additional-properties: false
  properties:
    ipsid:
      description: '评论所属的会话id'
      type: 'string'
      required: true          
