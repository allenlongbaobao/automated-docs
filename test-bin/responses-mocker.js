(function(){
  var loadFixture, config, messagesManager, usersManager, interestingPointsManager, locationsManager, debug, _, mockLocationsChannelInitialResponse, mockChannels, sortMessages, addBriefUserAndInterestingPointsSummariesWithMessages, replaceUidWithBriefUser;
  loadFixture = require('./utils').loadFixture;
  config = require('../bin/config');
  messagesManager = require('../bin/messages-manager');
  usersManager = require('../bin/users-manager');
  interestingPointsManager = require('../bin/interesting-points-manager');
  locationsManager = require('../bin/locations-manager');
  debug = require('debug')('at-plus');
  _ = require('underscore');
  mockLocationsChannelInitialResponse = function(locationId, currentUid){
    mockChannels(function(locations, interestingPointsSummariesMap, recentMessagesMap){
      var response;
      response = locations.filter(function(location){
        return location._id === locationId;
      })[0];
      addBriefUserAndInterestingPointsSummariesWithMessages(response, currentUid, locationId, interestingPointsSummariesMap, recentMessagesMap);
      return response;
    });
  };
  mockChannels = function(callback){
    var locations, interestingPointsSummariesMap, recentMessagesMap;
    locations = locationsManager.createLocationsForResponse(loadFixture("locations-in-db"));
    interestingPointsSummariesMap = interestingPointsManager.createInterestingPointsSummariesMap(loadFixture("interesting-points-in-db"));
    recentMessagesMap = messagesManager.createBriefRecentMessagesMap(sortMessages(loadFixture("messages-in-db")));
    if (callback) {
      callback(locations, interestingPointsSummariesMap, recentMessagesMap);
    }
  };
  sortMessages = function(messages){
    return _.sortBy(messages, 'createTime').reverse();
  };
  addBriefUserAndInterestingPointsSummariesWithMessages = function(response, currentUid, locationId, interestingPointsSummariesMap, recentMessagesMap){
    var i$, ref$, len$, ips;
    replaceUidWithBriefUser(interestingPointsSummariesMap, currentUid);
    response.interestingPointsSummaries = interestingPointsSummariesMap[locationId];
    for (i$ = 0, len$ = (ref$ = response.interestingPointsSummaries).length; i$ < len$; ++i$) {
      ips = ref$[i$];
      ips.recentMessages = recentMessagesMap[ips._id];
    }
  };
  replaceUidWithBriefUser = function(interestingPointsSummariesMap, currentUid){
    var briefUsersMap;
    briefUsersMap = usersManager.createBriefUsersMap(loadFixture('users-in-db'), currentUid);
    interestingPointsManager.visitUidsOfInterestingPointsSummariesMap(interestingPointsSummariesMap, function(value, attr){
      value[attr] = briefUsersMap[value[attr]];
    });
  };
  module.exports = {
    mockLocationsChannelInitialResponse: mockLocationsChannelInitialResponse,
    mockChannels: mockChannels
  };
}).call(this);
