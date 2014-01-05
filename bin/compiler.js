(function(){
  var fs, path, _, dataTemplate, getTemplate;
  fs = require('fs');
  path = require('path');
  _ = require('underscore');
  dataTemplate = {
    apiName: 'template',
    reqCode: 'req-data',
    resCode: 'res-data',
    schemaCode: 'schema-data'
  };
  getTemplate = function(templateId, callback){
    var file;
    file = path.join(__dirname, '../src/module/', templateId + '.rho');
    fs.stat(file, function(err, stat){
      if (err) {
        callback(err);
      }
      fs.readFile(file, {
        encoding: 'utf-8'
      }, function(err, data){
        var template;
        if (err) {
          callback(err);
        }
        template = _.template(data);
        callback(null, template);
      });
    });
  };
  module.exports = {
    getTemplate: getTemplate,
    compiler: function(templateId, data, callback){
      getTemplate(templateId, function(err, template){
        if (err) {
          callback(err);
        }
        callback(null, template(import$(dataTemplate, data)));
      });
    }
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
