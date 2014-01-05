require! ['fs', 'walk', 'path', './utils']
require! './compiler' .compiler

file-data = {}
root-dir = path.join __dirname, '..'
apis-dir = path.join root-dir, 'apis'
req-res-direct         = path.join __dirname, '../test/fixtures/requests-responses'
schema-direct          = path.join __dirname, '../test/fixtures/schema'

fs.mkdir-sync root-dir + '/apis'

add-info-into-file-data = (key, data)->
  file-data."{#key}" := data

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
    add-info-into-file-data 'req-code', file-str
    next!
  if utils.check-file-is-res file-state.name
    add-info-into-file-data 'res-code', file-str
    next!

<-! req-res-walker.on 'end'
schema-walker  = walk.walk schema-direct
schema-walker.on 'file', !(root, file-state, next)->
  file-str = utils.get-file-str root, file-state
  channel = utils.get-channel root, apis-dir
  api-name = utils.get-schema-api-name file-state.name
  add-info-into-file-data 'api-name', api-name
  add-info-into-file-data 'schema-code', file-str
  <-! write-file-str-into-api-file channel, api-name, file-str
  next!
