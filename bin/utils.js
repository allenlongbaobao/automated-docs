(function(){
  var fs, path;
  fs = require('fs');
  path = require('path');
  module.exports = {
    checkFileIsReq: function(fileName){
      var arr;
      arr = fileName.split('-');
      if (arr[0] === 'request') {
        return true;
      } else {
        return false;
      }
    },
    checkFileIsRes: function(fileName){
      var arr;
      arr = fileName.split('-');
      if (arr[0] === 'response') {
        return true;
      } else {
        return false;
      }
    },
    getFileStr: function(root, fileState){
      var fileName, fileStr;
      fileName = path.join(root, fileState.name);
      fileStr = fs.readFileSync(fileName, 'utf-8');
      return fileStr;
    },
    getSchemaApiName: function(fileName){
      var arr;
      arr = fileName.split('-');
      arr.pop();
      return arr.join('-');
    },
    getReqResApiName: function(fileName){
      var arr, newFileName;
      arr = fileName.split('.');
      arr.pop();
      newFileName = arr.join('-');
      arr = newFileName.split('-');
      arr.shift();
      return arr.join('-');
    },
    getChannel: function(root, apisDir){
      var arr, channel;
      arr = root.split('/');
      channel = arr.pop();
      console.log(channel);
      if (!fs.existsSync(path.join(apisDir, channel))) {
        fs.mkdirSync(path.join(apisDir, channel));
      }
      return channel;
    }
  };
}).call(this);
