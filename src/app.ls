require! ['fs', 'walk', 'path']
require! './compiler' .compiler

root-dir = path.join __dirname, '..'
apis-dir = path.join root-dir, 'apis'
req-res-direct         = path.join __dirname, '../test/fixtures/requests-responses'
schema-direct          = path.join __dirname, '../test/fixtures/schema'

fs.mkdir-sync root-dir + '/apis'
file-data = {}
check-file-is-req = (file-name)->
  arr = file-name.split '-'
  if arr[0] is 'request' then return true
  else return false

check-file-is-res = (file-name)->
  arr = file-name.split '-'
  if arr[0] is 'response' then return true
  else return false

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

add-req-into-file-str = (file-str)->
  file-data.req-code := file-str

add-res-into-file-str = (file-str)->
  file-data.res-code := file-str

add-schema-into-file-str = (file-str)->
  file-data.schema-cod := file-str

add-api-name-into-file-str = (api-name)->
  file-data.api-name := api-name

write-file-str-into-api-file = !(channel, api-name, fil-str, callback)->
  file-name = path.join apis-dir, channel, api-name + '.md'
  (err, file-str)<-! compiler 'hello', file-data
  if err then console.log err
  write file-name, file-str, callback

req-res-walker = walk.walk req-res-direct
req-res-walker.on 'file', !(root, file-state, next)->
  channel = get-channel root
  file-name = path.join root, file-state.name
  file-str = read file-name
  api-name = get-req-res-api-name file-state.name
  if check-file-is-req file-state.name
    add-req-into-file-str file-str
    next!
  if check-file-is-res file-state.name
    add-res-into-file-str file-str
    next!

<-! req-res-walker.on 'end'
schema-walker  = walk.walk schema-direct
schema-walker.on 'file', !(root, file-state, next)->
  channel = get-channel root
  file-name = path.join root, file-state.name
  file-str = read file-name
  api-name = get-schema-api-name file-state.name
  add-api-name-into-file-str api-name
  <-! write-file-str-into-api-file channel, api-name, file-str
  next!
