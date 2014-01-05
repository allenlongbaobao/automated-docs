request-report-interesting-point-session-updated =
  ipid: 'ipid-1' # 注意：这里是兴趣点id！！！不是会话的id！！！
response-report-interesting-point-session-updated =
  result: "success"
  errors: []
report-interesting-point-session-updated-schema =
  type: 'object'
  additional-properties: false
  properties: 
    ipid: 
      description: '确认的会话所属的兴趣点id'
      type: 'string'
      required: true
