require! ['./utils', './socket-helper']
debug = require('debug')('at-plus')
test-url = utils.load-fixture 'request-create-a-new-ip-and-session-on-a-new-url' .within-location.url

open-client-without-testing-helper = !(callback)->
  open-client null, callback   

open-client-with-testing-helper = !(is-url-new-location, uid, callback)->
  open-client {
    options: request-initial-data:
      testing-control: locations-manager: get-old-or-create-new-location: is-new: is-url-new-location
      fake-uid: uid
  }, callback   


open-two-clients = !(is-url-new-location, uid1, uid2, done, callback)->
  (a-locations-channel, a-ip-channel, a-users-channel, data) <-! open-client-with-testing-helper is-url-new-location, uid1
  (b-locations-channel, b-ip-channel, b-users-channel, data) <-! open-client-with-testing-helper is-url-new-location, uid2
  done-waiter = new utils.All-done-waiter done
  callback {locations: a-locations-channel, ip: a-ip-channel, users: a-users-channel}, {locations: b-locations-channel, ip: b-ip-channel, users: b-users-channel}, done-waiter.add-waiting-function

open-client = !(testing-helper-channel-config, callback)->
  channels = null
  waiter = new utils.All-done-waiter! # 用以保存各个频道的channels，在所有回调结束后才可用。
  channels-configs =
    default-channel: {}
    users-channel: {}
    locations-channel: options: request-initial-data: locations:
      type: "web"
      urls: [test-url]
    interesting-points-channel: business-handler-register: !(socket, data)->
      socket-helper.Sockets-destroyer.get!.add-socket socket # 为了在每个测试结束，关闭服务端的socket，以便隔离各个测例。
      waiter.set-done -> 
        callback channels.locations-channel, channels.interesting-points-channel, channels.users-channel,  data

  channels-configs.testing-helper-channel = testing-helper-channel-config if testing-helper-channel-config

  socket-helper.initial-client channels-configs, waiter.add-waiting-function !(cs)->
    channels := cs
    debug "客户端初始化完毕"   

fake-figure-out-location-internality = (url, server-retrieved-html)->
  # debug ' .... 真实的client会在这里将server-retrieved-html和自己打开的location（url）中的源码进行比较，确定是否一致。一致则是not internal，否则是internal ...'
  true # 测试用true，激发服务器响应行为

module.exports =
  open-client-without-testing-helper: open-client-without-testing-helper
  open-client-with-testing-helper: open-client-with-testing-helper
  open-two-clients: open-two-clients
  fake-figure-out-location-internality: fake-figure-out-location-internality
