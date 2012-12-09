var utilities = require('utilities')
  , Loader    = require('./Loader').Loader
  , loader    = new Loader(__dirname)

module.exports = utilities.mixin(utilities, loader.load().utilities);

module.exports.noop       = function() {};
module.exports.returnMe   = function(){ return this; };
module.exports.makeArray  = function(object) {
  if (! object.length) {
    object.length = 0;

    for (var prop in object) {
      if (! isNaN(+prop)){
        ++object.length;
      }
    }
  }

  return [].map.call(object, function(v){ return v; });
};

module.exports.valueFromPath = function(path, object){ 
  return (new Function('o','return o' + path.replace(/\.?([a-z|0-9]+)\.?/gi,'["$1"]')))(object);
}

module.exports.parseStringVariables = function(string, vars) {
  var key

  for (key in vars) {
    string = string.replace('${' + key + '}', vars[key]); // Set the vars
  }

  string = string.replace(/(\$\{[a-z]+\})/gi,''); // Get rid of any undefined

  return string
}