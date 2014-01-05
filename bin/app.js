(function(){
  var fs, walk, path, utils, compiler, fileData, rootDir, apisDir, reqResDirect, schemaDirect, addReqIntoFileData, addResIntoFileData, addApiNameIntoFileData, addSchemaIntoFileData, write, writeFileStrIntoApiFile, reqResWalker;
  fs = require('fs');
  walk = require('walk');
  path = require('path');
  utils = require('./utils');
  compiler = require('./compiler').compiler;
  fileData = {};
  rootDir = path.join(__dirname, '..');
  apisDir = path.join(rootDir, 'apis');
  reqResDirect = path.join(__dirname, '../test/fixtures/requests-responses');
  schemaDirect = path.join(__dirname, '../test/fixtures/schema');
  fs.mkdirSync(rootDir + '/apis');
  addReqIntoFileData = function(data){
    return fileData.reqCode = data;
  };
  addResIntoFileData = function(data){
    return fileData.resCode = data;
  };
  addApiNameIntoFileData = function(data){
    return fileData.apiName = data;
  };
  addSchemaIntoFileData = function(data){
    return fileData.schemaCode = data;
  };
  write = function(fileName, fileStr, callback){
    fs.appendFile(fileName, fileStr, function(err){
      if (err) {
        console.log(err);
      }
      return callback();
    });
  };
  writeFileStrIntoApiFile = function(channel, apiName, filStr, callback){
    var fileName;
    fileName = path.join(apisDir, channel, apiName + '.md');
    compiler('api-template', fileData, function(err, fileStr){
      if (err) {
        console.log(err);
      }
      write(fileName, fileStr, callback);
    });
  };
  reqResWalker = walk.walk(reqResDirect);
  reqResWalker.on('file', function(root, fileState, next){
    var fileStr;
    fileStr = utils.getFileStr(root, fileState);
    if (utils.checkFileIsReq(fileState.name)) {
      addReqIntoFileData(fileStr);
      next();
    }
    if (utils.checkFileIsRes(fileState.name)) {
      addResIntoFileData(fileStr);
      next();
    }
  });
  reqResWalker.on('end', function(){
    var schemaWalker;
    schemaWalker = walk.walk(schemaDirect);
    schemaWalker.on('file', function(root, fileState, next){
      var fileStr, channel, apiName;
      fileStr = utils.getFileStr(root, fileState);
      channel = utils.getChannel(root, apisDir);
      apiName = utils.getSchemaApiName(fileState.name);
      addApiNameIntoFileData(apiName);
      addSchemaIntoFileData(fileStr);
      writeFileStrIntoApiFile(channel, apiName, fileStr, function(){
        next();
      });
    });
  });
}).call(this);
