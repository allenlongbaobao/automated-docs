(function(){
  '测试文件的头部。本文件代码在项目编译前，被添加到所有测试代码（test**.ls）的最前面。这样，避免了在多个测试文件中写一样的头部。';
  var should, async, _, utils, socketHelper, responsesMocker, channelInitialWrapper, server, database, config, debug, countAmountOfDocsInACollection, queryCollection, can;
  should = require('should');
  async = require('async');
  _ = require('underscore');
  utils = require('../../utils');
  socketHelper = require('../../socket-helper');
  responsesMocker = require('../../responses-mocker');
  channelInitialWrapper = require('../../../bin/channel-initial-wrapper');
  server = require('../../../bin/server');
  database = require('../../../bin/database');
  config = require('../../../bin/config');
  debug = require('debug')('at-plus');
  countAmountOfDocsInACollection = utils.countAmountOfDocsInACollection;
  queryCollection = database.queryCollection;
  can = it;
}).call(this);
