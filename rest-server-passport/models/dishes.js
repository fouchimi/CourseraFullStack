//GEt the things we want
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;

//Create comment Schema
var commentSchema = new Schema({
  rating :{
    type:Number,
    min:1,
    max:5,
    required:true
  },
  comment:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  }
}, {
    timestamps:true
});

//Create dish Schema
var dishSchema = new Schema({
  name :{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  label:{
    type:String,
    default:""
  },
  price:{
    type: Currency
  },
  description:{
    type:String,
    required:true
  },
  comments:[commentSchema]
}, {
    timestamps:true
});

//The schema is useless
//Let's create a model and use it.
var Dishes = mongoose.model('Dish', dishSchema);

//Make this available to our node application
module.exports = Dishes;
