request-report-reply-updated =
  cid: 'mid-1' # 注意：这是评论的id！！！不是回复的id
response-report-reply-updated =
  result: "success"
  errors: []
report-reply-updated-schema =
 type: 'object'
 additional-properties: false
 properties:
   cid:
     description: '回复所属的评论id'
     type: 'string'
     required: true
