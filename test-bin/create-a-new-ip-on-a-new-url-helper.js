(function(){
  var utils, socketHelper, debug, testUrl, openClientWithoutTestingHelper, openClientWithTestingHelper, openTwoClients, openClient, fakeFigureOutLocationInternality;
  utils = require('./utils');
  socketHelper = require('./socket-helper');
  debug = require('debug')('at-plus');
  testUrl = utils.loadFixture('request-create-a-new-ip-and-session-on-a-new-url').withinLocation.url;
  openClientWithoutTestingHelper = function(callback){
    openClient(null, callback);
  };
  openClientWithTestingHelper = function(isUrlNewLocation, uid, callback){
    openClient({
      options: {
        requestInitialData: {
          testingControl: {
            locationsManager: {
              getOldOrCreateNewLocation: {
                isNew: isUrlNewLocation
              }
            }
          },
          fakeUid: uid
        }
      }
    }, callback);
  };
  openTwoClients = function(isUrlNewLocation, uid1, uid2, done, callback){
    openClientWithTestingHelper(isUrlNewLocation, uid1, function(aLocationsChannel, aIpChannel, aUsersChannel, data){
      openClientWithTestingHelper(isUrlNewLocation, uid2, function(bLocationsChannel, bIpChannel, bUsersChannel, data){
        var doneWaiter;
        doneWaiter = new utils.AllDoneWaiter(done);
        callback({
          locations: aLocationsChannel,
          ip: aIpChannel,
          users: aUsersChannel
        }, {
          locations: bLocationsChannel,
          ip: bIpChannel,
          users: bUsersChannel
        }, doneWaiter.addWaitingFunction);
      });
    });
  };
  openClient = function(testingHelperChannelConfig, callback){
    var channels, waiter, channelsConfigs;
    channels = null;
    waiter = new utils.AllDoneWaiter();
    channelsConfigs = {
      defaultChannel: {},
      usersChannel: {},
      locationsChannel: {
        options: {
          requestInitialData: {
            locations: {
              type: "web",
              urls: [testUrl]
            }
          }
        }
      },
      interestingPointsChannel: {
        businessHandlerRegister: function(socket, data){
          socketHelper.SocketsDestroyer.get().addSocket(socket);
          waiter.setDone(function(){
            return callback(channels.locationsChannel, channels.interestingPointsChannel, channels.usersChannel, data);
          });
        }
      }
    };
    if (testingHelperChannelConfig) {
      channelsConfigs.testingHelperChannel = testingHelperChannelConfig;
    }
    socketHelper.initialClient(channelsConfigs, waiter.addWaitingFunction(function(cs){
      channels = cs;
      debug("客户端初始化完毕");
    }));
  };
  fakeFigureOutLocationInternality = function(url, serverRetrievedHtml){
    return true;
  };
  module.exports = {
    openClientWithoutTestingHelper: openClientWithoutTestingHelper,
    openClientWithTestingHelper: openClientWithTestingHelper,
    openTwoClients: openTwoClients,
    fakeFigureOutLocationInternality: fakeFigureOutLocationInternality
  };
}).call(this);
