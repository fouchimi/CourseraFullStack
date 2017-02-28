//GEt the things we want
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;

//Create promotion Schema
var promotionSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  label:{
    type:String,
    default:true
  },
  price:{
    type:Currency,
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
var Promotions = mongoose.model('Promotion', promotionSchema);

//Make this available to our node application
module.exports = Promotions;
