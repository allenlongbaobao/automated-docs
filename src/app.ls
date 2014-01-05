require! ['fs', 'walk', 'path', './utils']
require! './compiler' .compiler

file-data = {}
root-dir = path.join __dirname, '..'
apis-dir = path.join root-dir, 'apis'
req-res-direct         = path.join __dirname, '../test/fixtures/requests-responses'
schema-direct          = path.join __dirname, '../test/fixtures/schema'

fs.mkdir-sync root-dir + '/apis'

add-req-into-file-data = (data)->
  file-data.req-code = data

add-res-into-file-data = (data)->
  file-data.res-code = data

add-api-name-into-file-data = (data)->
  file-data.api-name = data

add-schema-into-file-data = (data)->
  file-data.schema-code = data

write = !(file-name, file-str, callback)->
  (err) <- fs.append-file file-name, file-str
  if err then console.log err
  callback!

write-file-str-into-api-file = !(channel, api-name, fil-str, callback)->
  file-name = path.join apis-dir, channel, api-name + '.md'
  (err, file-str)<-! compiler 'api-template', file-data
  if err then console.log err
  write file-name, file-str, callback

req-res-walker = walk.walk req-res-direct
req-res-walker.on 'file', !(root, file-state, next)->
  file-str = utils.get-file-str root, file-state
  if utils.check-file-is-req file-state.name
    add-req-into-file-data file-str
    next!
  if utils.check-file-is-res file-state.name
    add-res-into-file-data file-str
    next!

<-! req-res-walker.on 'end'
schema-walker  = walk.walk schema-direct
schema-walker.on 'file', !(root, file-state, next)->
  file-str = utils.get-file-str root, file-state
  channel = utils.get-channel root, apis-dir
  api-name = utils.get-schema-api-name file-state.name
  add-api-name-into-file-data api-name
  add-schema-into-file-data file-str
  <-! write-file-str-into-api-file channel, api-name, file-str
  next!
