(function(){
  var compiler;
  compiler = require('./compiler').compiler;
  compiler('hello', {
    name: 'world'
  }, function(err, text){
    if (err) {
      console.log(err);
    }
    console.log(text);
  });
}).call(this);
