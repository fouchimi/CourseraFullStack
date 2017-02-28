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

   var newDish = Dishes({
     name:"Uthapizza",
     description:"Test"
   });

   newDish.save(function(err){
     if(err) throw err;
     console.log('Dish created!');

     Dishes.find({}, function(err, dishes){
       if(err) throw err;

       //object of all the dishes
       console.log(dishes);
       db.collection('dishes').drop(function(){
         db.close();
       });
     });
   });

});
