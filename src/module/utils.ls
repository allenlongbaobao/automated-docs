require! ['fs', 'path']

module.exports =
  check-file-is-req: (file-name)->
    arr = file-name.split '-'
    if arr[0] is 'request' then return true
    else return false

  check-file-is-res: (file-name)->
    arr = file-name.split '-'
    if arr[0] is 'response' then return true
    else return false

  get-file-str: (root, file-state)->
    file-name = path.join root, file-state.name
    file-str = fs.read-file-sync file-name, 'utf-8'
    return file-str

  get-schema-api-name: (file-name)->
    arr = file-name.split '-'
    arr.pop!
    return arr.join '-'

  get-req-res-api-name: (file-name)->
    arr = file-name.split '.'
    arr.pop!
    new-file-name = arr.join '-'
    arr = new-file-name.split '-'
    arr.shift!
    return arr.join '-'

  get-channel: (root, apis-dir)->
    arr = root.split '/'
    channel = arr.pop!
    console.log  channel
    if !fs.exists-sync path.join apis-dir, channel
      fs.mkdir-sync path.join apis-dir, channel
    return channel
