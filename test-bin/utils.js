(function(){
  var async, database, config, debug, _, FIXTURE_PATH, AllDoneWaiter, loadFixture, openCleanDbAndLoadFixtures, prepareCleanTestDb, cleanDbAndLoadFixture, closeDb, countAmountOfDocsInACollection, chopOffId;
  async = require('async');
  database = require('../bin/database');
  config = require('../bin/config');
  debug = require('debug')('at-plus');
  _ = require('underscore');
  FIXTURE_PATH = __dirname + '/../test-bin/';
  AllDoneWaiter = (function(){
    AllDoneWaiter.displayName = 'AllDoneWaiter';
    var prototype = AllDoneWaiter.prototype, constructor = AllDoneWaiter;
    function AllDoneWaiter(done){
      this.done = done;
      this.check = bind$(this, 'check', prototype);
      this.addWaitingFunction = bind$(this, 'addWaitingFunction', prototype);
      this.setDone = bind$(this, 'setDone', prototype);
      this.runningFunctions = 0;
    }
    prototype.setDone = function(done){
      return this.done = done;
    };
    prototype.addWaitingFunction = function(fn){
      var this$ = this;
      this.runningFunctions += 1;
      return function(){
        if (fn) {
          fn.apply(null, arguments);
        }
        this$.runningFunctions -= 1;
        this$.check();
      };
    };
    prototype.check = function(){
      if (this.runningFunctions === 0) {
        this.done();
      }
    };
    return AllDoneWaiter;
  }());
  loadFixture = function(dataName){
    return eval(require('fs').readFileSync(FIXTURE_PATH + dataName + '.js', {
      encoding: 'utf-8'
    }));
  };
  openCleanDbAndLoadFixtures = function(config, done){
    database.getDb(function(db){
      db.dropDatabase(function(){
        var collections;
        collections = _.keys(config);
        async.each(collections, function(collection, next){
          db.atPlus[collection].insert(config[collection], {
            safe: true
          }, function(err, docs){
            next();
          });
        }, function(){
          done();
        });
      });
    });
  };
  prepareCleanTestDb = function(done){
    var locations, interestingPoints, users, messages;
    locations = loadFixture("locations-in-db");
    interestingPoints = loadFixture("interesting-points-in-db");
    users = loadFixture("users-in-db");
    messages = loadFixture("messages-in-db");
    openCleanDbAndLoadFixtures({
      'locations': locations,
      'interesting-points': interestingPoints,
      'users': users,
      'messages': messages
    }, done);
  };
  cleanDbAndLoadFixture = function(filepath, fixtureNames, done){
    var config, i$, len$, name;
    config = {};
    for (i$ = 0, len$ = fixtureNames.length; i$ < len$; ++i$) {
      name = fixtureNames[i$];
      config[name] = loadFixture(filepath + "/fixture/" + name + "-in-db");
    }
    openCleanDbAndLoadFixtures(config, done);
  };
  closeDb = function(done){
    database.getDb(function(db){
      database.shutdownMongoClient(done);
    });
  };
  countAmountOfDocsInACollection = function(collectionName, callback){
    database.queryCollection(collectionName, {}, function(results){
      callback(results.length);
    });
  };
  chopOffId = function(obj){
    var i$, len$, item, ref$, key;
    if (_.isArray(obj)) {
      for (i$ = 0, len$ = obj.length; i$ < len$; ++i$) {
        item = obj[i$];
        chopOffId(item);
      }
    } else {
      if (typeof obj === 'object') {
        delete obj._id;
        for (i$ = 0, len$ = (ref$ = _.keys(obj)).length; i$ < len$; ++i$) {
          key = ref$[i$];
          chopOffId(obj[key]);
        }
      }
    }
    return obj;
  };
  module.exports = {
    AllDoneWaiter: AllDoneWaiter,
    loadFixture: loadFixture,
    openCleanDbAndLoadFixtures: openCleanDbAndLoadFixtures,
    prepareCleanTestDb: prepareCleanTestDb,
    closeDb: closeDb,
    countAmountOfDocsInACollection: countAmountOfDocsInACollection,
    chopOffId: chopOffId,
    cleanDbAndLoadFixture: cleanDbAndLoadFixture
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
