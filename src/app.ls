require! ['fs', 'walk', 'path']
require! './compiler' .compiler

#md = require "node-markdown" .Markdown

root-dir = path.join __dirname, '..'
apis-dir = path.join root-dir, 'apis'
#template-dir = root-dir + '/test/helpers/api-template'
req-res-direct         = path.join __dirname, '../test/fixtures/requests-responses'
schema-direct          = path.join __dirname, '../test/fixtures/schema'

fs.mkdir-sync root-dir + '/apis'

get-schema-api-name = (file-name)->
  arr = file-name.split '-'
  arr.pop!
  return arr.join '-'

get-req-res-api-name = (file-name)->
  arr = file-name.split '.'
  arr.pop!
  new-file-name = arr.join '-'
  arr = new-file-name.split '-'
  arr.shift!
  return arr.join '-'

get-channel = (root)->
  arr = root.split '/'
  channel = arr.pop!
  console.log  channel
  if !fs.exists-sync path.join apis-dir, channel
    fs.mkdir-sync path.join apis-dir, channel
  return channel

read = (file-name)->
  fs.read-file-sync file-name, 'utf-8'

write = !(file-name, file-str, callback)->
  (err) <- fs.append-file file-name, file-str
  if err then console.log err
  callback!

write-into-api-file = !(channel, api-name, file-str, callback)->
  file-name = path.join apis-dir, channel, api-name + '.md'
  (err, file-str)<-! compiler 'hello', {req: 'this is req', code: file-str}
  console.log file-str, err
  write file-name, err, callback

req-res-walker = walk.walk req-res-direct
req-res-walker.on 'file', !(root, file-state, next)->
  channel = get-channel root
  file-name = path.join root, file-state.name
  file-str = read file-name
  api-name = get-req-res-api-name file-state.name
  <-! write-into-api-file channel, api-name, file-str
  next!

<-! req-res-walker.on 'end'
schema-walker  = walk.walk schema-direct
schema-walker.on 'file', !(root, file-state, next)->
  channel = get-channel root
  file-name = path.join root, file-state.name
  file-str = read file-name
  api-name = get-schema-api-name file-state.name
  console.log api-name
  <-! write-into-api-file channel, api-name, file-str
  next!


