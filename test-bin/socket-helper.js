(function(){
  var async, config, channelInitialWrapper, usersManager, debug, _, io, SocketsDestroyer, clearAllClientSockets, initialClient, initialChannel, requestServer, baseUrl, defaultChannelUrl, testingHelperChannelUrl, usersChannelUrl, locationsChannelUrl, interestingPointsChannelUrl, chatsChannelUrl, options, SERVER_CHANNELS, getClient, mockLoggedInAndSendSidBack, initialAllChannels;
  async = require('async');
  config = require('../bin/config');
  channelInitialWrapper = require('../bin/channel-initial-wrapper');
  usersManager = require('../bin/users-manager');
  debug = require('debug')('at-plus');
  _ = require('underscore');
  io = require('socket.io-client');
  SocketsDestroyer = (function(){
    SocketsDestroyer.displayName = 'SocketsDestroyer';
    var instance, Destroyer, prototype = SocketsDestroyer.prototype, constructor = SocketsDestroyer;
    instance = null;
    Destroyer = (function(){
      Destroyer.displayName = 'Destroyer';
      var prototype = Destroyer.prototype, constructor = Destroyer;
      function Destroyer(){
        this.clientSockets = [];
      }
      prototype.addSocket = function(socket){
        this.clientSockets.push(socket);
      };
      prototype.destroyAll = function(){
        var i$, ref$, len$, socket;
        for (i$ = 0, len$ = (ref$ = this.clientSockets).length; i$ < len$; ++i$) {
          socket = ref$[i$];
          if (socket.socket) {
            socket = socket.socket;
          }
          socket.disconnect();
        }
        this.clientSockets = [];
      };
      return Destroyer;
    }());
    SocketsDestroyer.get = function(socket){
      return instance != null
        ? instance
        : instance = new Destroyer(socket);
    };
    function SocketsDestroyer(){}
    return SocketsDestroyer;
  }());
  clearAllClientSockets = function(){
    delete require('socket.io-client/lib/io.js').sockets[config.server.baseUrl];
  };
  initialClient = function(channelsConfigs, callback){
    var channels, responseData;
    channels = {};
    responseData = {};
    clearAllClientSockets();
    async.eachSeries(_.keys(SERVER_CHANNELS), function(channel, next){
      var channelConfig, ref$;
      if (channelsConfigs[channel]) {
        channelConfig = (ref$ = channelsConfigs[channel], ref$.url = SERVER_CHANNELS[channel], ref$);
        return initialChannel(channelConfig, function(socket, data){
          channels[channel] = socket;
          responseData[channel] = data;
          next();
        });
      } else {
        return next();
      }
    }, function(){
      callback(channels, responseData);
    });
  };
  initialChannel = function(channelConfig, callback){
    requestServer(import$({
      url: channelConfig.url
    }, channelConfig.options), function(socket, data){
      var defaultChannel;
      defaultChannel = socket;
      if (channelConfig.businessHandlerRegister) {
        channelConfig.businessHandlerRegister(socket, data);
      }
      callback(socket, data);
    });
  };
  requestServer = function(alterOption, businessHandlersRegister){
    channelInitialWrapper.clientChannelInitialWrapper(import$({
      io: io,
      url: baseUrl,
      options: options,
      businessHandlersRegister: function(client, responseInitialData, initialCallback){
        businessHandlersRegister(client, responseInitialData);
        initialCallback();
      }
    }, alterOption));
  };
  baseUrl = config.server.baseUrl;
  defaultChannelUrl = baseUrl;
  testingHelperChannelUrl = baseUrl + "/testing-helper";
  usersChannelUrl = baseUrl + "/users";
  locationsChannelUrl = baseUrl + "/locations";
  interestingPointsChannelUrl = baseUrl + "/interesting-points";
  chatsChannelUrl = baseUrl + "/chats";
  options = {
    'force new connection': false,
    'reconnect': false
  };
  SERVER_CHANNELS = {
    defaultChannel: defaultChannelUrl,
    testingHelperChannel: testingHelperChannelUrl,
    usersChannel: usersChannelUrl,
    locationsChannel: locationsChannelUrl,
    interestingPointsChannel: interestingPointsChannelUrl,
    chatsChannel: chatsChannelUrl
  };
  getClient = function(config, callback){
    config = import$({
      urls: [],
      uid: '',
      loggedIn: false
    }, config);
    if (config.loggedIn === true) {
      mockLoggedInAndSendSidBack(config.uid, function(sid){
        initialAllChannels(sid, config.urls, callback);
      });
    } else {
      initialAllChannels('', config.urls, callback);
    }
  };
  mockLoggedInAndSendSidBack = function(uid, callback){
    initialClient({
      testingHelperChannel: {
        options: {
          requestInitialData: {
            uid: uid
          }
        }
      },
      defaultChannel: {}
    }, function(channels, responseDatas){
      channels.defaultChannel.socket.disconnect();
      callback(responseDatas.defaultChannel.sid);
    });
  };
  initialAllChannels = function(sid, urls, callback){
    initialClient({
      defaultChannel: {
        options: {
          requestInitialData: {
            sid: sid
          }
        }
      },
      locationsChannel: {
        options: {
          requestInitialData: {
            urls: urls
          }
        }
      },
      interestingPointsChannel: {},
      usersChannel: {},
      chatsChannel: {}
    }, function(channels, datas){
      SocketsDestroyer.get().addSocket(channels.defaultChannel);
      callback(channels, datas);
    });
  };
  module.exports = {
    SocketsDestroyer: SocketsDestroyer,
    clearAllClientSockets: clearAllClientSockets,
    initialClient: initialClient,
    getClient: getClient
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
