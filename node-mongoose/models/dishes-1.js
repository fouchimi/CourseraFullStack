//GEt the things we want
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a Schema
var dishSchema = new Schema({
  name :{
    type:String,
    required:true,
    unique:true
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
var Dishes = mongoose.model('Dish', dishSchema);

//Make this available to our node application
module.exports = Dishes;
