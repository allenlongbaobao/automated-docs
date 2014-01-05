require! ['fs', 'path']
_ = require 'underscore'

data-template =
  api-name: 'template'
  req-code: 'req-data'
  res-code: 'res-data'
  schema-code: 'schema-data'

get-template = !(template-id, callback)->
  file = path.join __dirname, '../src/module/', template-id + '.rho'
  (err, stat) <-! fs.stat file
  if err then callback err

  (err, data) <-! fs.read-file file, {encoding: 'utf-8'}
  if err then callback err

  template = _.template data
  callback null, template

module.exports =
  get-template: get-template
  compiler: !(template-id, data, callback)->
    (err, template) <-! get-template template-id
    if err then callback err
    callback null, template data-template <<< data

