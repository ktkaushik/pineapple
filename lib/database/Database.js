var DatabaseError = require('./DatabaseError').DatabaseError

/**
  @namespace database
**/
var database = {};

database.Database = function Database(name, type, adapter){
  this.name     = name;
  this.type     = type;
  this.adapter  = adapter;
};

database.Database.prototype.connect = function(){
  try {
    return this.adapter.connect.apply(this.adapter, arguments);
  }
  catch (e){
    throw new DatabaseError(e.message);
  }
};

module.exports = database;