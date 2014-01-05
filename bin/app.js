(function(){
  var fs, walk, path, compiler, rootDir, apisDir, reqResDirect, schemaDirect, getSchemaApiName, getReqResApiName, getChannel, read, write, writeIntoApiFile, reqResWalker;
  fs = require('fs');
  walk = require('walk');
  path = require('path');
  compiler = require('./compiler').compiler;
  rootDir = path.join(__dirname, '..');
  apisDir = path.join(rootDir, 'apis');
  reqResDirect = path.join(__dirname, '../test/fixtures/requests-responses');
  schemaDirect = path.join(__dirname, '../test/fixtures/schema');
  fs.mkdirSync(rootDir + '/apis');
  getSchemaApiName = function(fileName){
    var arr;
    arr = fileName.split('-');
    arr.pop();
    return arr.join('-');
  };
  getReqResApiName = function(fileName){
    var arr, newFileName;
    arr = fileName.split('.');
    arr.pop();
    newFileName = arr.join('-');
    arr = newFileName.split('-');
    arr.shift();
    return arr.join('-');
  };
  getChannel = function(root){
    var arr, channel;
    arr = root.split('/');
    channel = arr.pop();
    console.log(channel);
    if (!fs.existsSync(path.join(apisDir, channel))) {
      fs.mkdirSync(path.join(apisDir, channel));
    }
    return channel;
  };
  read = function(fileName){
    return fs.readFileSync(fileName, 'utf-8');
  };
  write = function(fileName, fileStr, callback){
    fs.appendFile(fileName, fileStr, function(err){
      if (err) {
        console.log(err);
      }
      return callback();
    });
  };
  writeIntoApiFile = function(channel, apiName, fileStr, callback){
    var fileName;
    fileName = path.join(apisDir, channel, apiName + '.md');
    compiler('hello', {
      req: 'this is req',
      code: fileStr
    }, function(err, fileStr){
      console.log(fileStr, err);
      write(fileName, err, callback);
    });
  };
  reqResWalker = walk.walk(reqResDirect);
  reqResWalker.on('file', function(root, fileState, next){
    var channel, fileName, fileStr, apiName;
    channel = getChannel(root);
    fileName = path.join(root, fileState.name);
    fileStr = read(fileName);
    apiName = getReqResApiName(fileState.name);
    writeIntoApiFile(channel, apiName, fileStr, function(){
      next();
    });
  });
  reqResWalker.on('end', function(){
    var schemaWalker;
    schemaWalker = walk.walk(schemaDirect);
    schemaWalker.on('file', function(root, fileState, next){
      var channel, fileName, fileStr, apiName;
      channel = getChannel(root);
      fileName = path.join(root, fileState.name);
      fileStr = read(fileName);
      apiName = getSchemaApiName(fileState.name);
      console.log(apiName);
      writeIntoApiFile(channel, apiName, fileStr, function(){
        next();
      });
    });
  });
}).call(this);
