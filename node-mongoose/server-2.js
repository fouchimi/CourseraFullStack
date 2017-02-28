var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

//Connection url
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
   //We're Connected
   console.log('Connected successfully to server');

   //Create a new Dish
   Dishes.create({
     name:"Uthapizza",
     description:"Test"
   },
     function(err, dish){
       if(err) throw err;
       console.log('New dish created!');
       console.log(dish);
       var _id = dish._id;

       setTimeout(function(){
         Dishes.findByIdAndUpdate(_id, {
           $set : {
             description : "Updated Test"
           }
         }, {
           new : true
         }).exec(function(err, dish){
           if(err) throw err;
           console.log('Updated dish!');
           console.log(dish);

           db.collection('dishes').drop(function(){
             db.close();
           });
         });
       }, 3000);
  });
});
