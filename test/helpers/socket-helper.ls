require! [async, '../bin/config', '../bin/channel-initial-wrapper', '../bin/users-manager']
debug = require('debug')('at-plus')
_ = require 'underscore'
io = require 'socket.io-client'

#------------------- Utility Classes ------------------#

class Sockets-destroyer # Singleton
  instance = null

  class Destroyer
    !->
      @client-sockets = []
    add-socket: !(socket)->
      @client-sockets.push socket
    destroy-all: !->
      for socket in @client-sockets
        socket = socket.socket if socket.socket # 当socket.io 连接到有namespace的情况要用socket.socket.disconnect!
        socket.disconnect!
      @client-sockets = []

  @get = (socket)->
    instance ?:= new Destroyer socket


#------------------- Utility Functions ------------------#

clear-all-client-sockets = !->
  # 还需要清空user-status-store中的数据
  delete (require 'socket.io-client/lib/io.js').sockets[config.server.base-url]

initial-client = !(channels-configs, callback)->
  channels = {}
  response-data = {}
  clear-all-client-sockets!
  async.each-series (_.keys SERVER_CHANNELS), (channel, next)->
    if channels-configs[channel] # 需要初始化该频道
      channel-config = channels-configs[channel] <<< {url: SERVER_CHANNELS[channel]}
      (socket, data) <-! initial-channel channel-config
      channels[channel] = socket
      response-data[channel] = data
      next!
    else
      next!
  , !->
    callback channels, response-data


initial-channel = !(channel-config, callback)->
  (socket, data) <-! request-server {url: channel-config.url} <<< channel-config.options
  # debug "initial-channel, socket: ", socket.socket.sessionid
  default-channel = socket
  channel-config.business-handler-register socket, data if channel-config.business-handler-register
  callback socket, data

request-server = !(alter-option, business-handlers-register) ->
  channel-initial-wrapper.client-channel-initial-wrapper {
    io: io
    url: base-url
    options: options
    business-handlers-register: !(client, response-initial-data, initial-callback)->
      business-handlers-register client, response-initial-data
      initial-callback!
  } <<< alter-option

base-url = config.server.base-url
default-channel-url = base-url
testing-helper-channel-url = base-url + "/testing-helper"
users-channel-url = base-url + "/users"
locations-channel-url = base-url + "/locations"
interesting-points-channel-url = base-url + "/interesting-points"
chats-channel-url = base-url + "/chats"

options = 
  # transports: ['websocket']
  'force new connection': false
  'reconnect': false

SERVER_CHANNELS =
  default-channel: default-channel-url
  testing-helper-channel: testing-helper-channel-url
  users-channel: users-channel-url
  locations-channel: locations-channel-url
  interesting-points-channel: interesting-points-channel-url
  chats-channel: chats-channel-url

# config
#   uid: 模拟登陆的用户id
#   urls: 模拟用户所在的页面
#   logged-in: 是否模拟登陆
get-client = !(config, callback)->
  config = {urls: [], uid: '', logged-in: false} <<< config
  if config.logged-in is true
    (sid) <-! mock-logged-in-and-send-sid-back config.uid
    initial-all-channels sid, config.urls, callback
  else
    initial-all-channels '', config.urls, callback

mock-logged-in-and-send-sid-back = !(uid, callback)->
  initial-client {
    testing-helper-channel:
      options:
        request-initial-data:
          uid: uid
    default-channel: {}
  }, !(channels, response-datas)->
    # 这里需要手动将socket断开连接
    channels.default-channel.socket.disconnect!
    callback response-datas.default-channel.sid

initial-all-channels = !(sid, urls, callback)->
  initial-client {
    default-channel:
      options:
        request-initial-data: sid: sid
    locations-channel:
      options:
        request-initial-data: urls: urls
    interesting-points-channel: {}
    users-channel: {}
    chats-channel: {}
  }, !(channels, datas)->
    Sockets-destroyer.get!.add-socket channels.default-channel
    callback channels, datas

module.exports =
  Sockets-destroyer: Sockets-destroyer
  clear-all-client-sockets: clear-all-client-sockets
  initial-client: initial-client
  get-client: get-client
