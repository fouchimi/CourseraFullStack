//Get the things we want
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Schema = mongoose.Schema;

//Create leadership Schema
var leadershipSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  abbr:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  }
}, {
    timestamps:true
});

//The schema is useless
//Let's create a model and use it.
var Leaderships = mongoose.model('Leadership', leadershipSchema);

//Make this available to our node application
module.exports = Leaderships;
