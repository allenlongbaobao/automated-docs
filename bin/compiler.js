(function(){
  var fs, path, _, getTemplate;
  fs = require('fs');
  path = require('path');
  _ = require('underscore');
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
        callback(template(data));
      });
    }
  };
}).call(this);
