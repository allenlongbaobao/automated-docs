# this is this is req

h2 this is req

code:
    request-retrieve-matched-friends-name-with-part-name = 
  part-name: '嘉'


# this is this is req

h2 this is req

code:
    response-retrieve-matched-friends-name-with-part-name =
  result: 'success'
  errors: []
  matched-friends-name: ['嘉华', '嘉美']



# this is this is req

h2 this is req

code:
    retrieve-matched-friends-name-with-part-name-schema =
  type: 'object'
  additional-properties: false
  properties:
    part-name:
      description: '需要查询的部分名称'
      type: 'string'
      required: true

