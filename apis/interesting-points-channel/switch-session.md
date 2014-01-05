request-switch-session =
  new-ipsid: 'ipsid-1'
  old-ipsid: 'ipsid-2'
response-switch-session =
  result: "success"
  errors: []
switch-session-schema =
  type: 'object'
  additional-properties: false
  properties:
    new-ipsid:
      description: '切换后的会话id'
      type: 'string'
      required: true
    old-ipsid:
      description: '切换前的会话id'
      type: 'string'
      required: true
