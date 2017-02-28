var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-3');

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
     description:"Test",
     comments:[
       {
         rating: 3,
         comment: "This is insane",
         author: "Matt Daemon"
       }
     ]
   },
     function(err, dish){
       if(err) throw err;
       console.log('New dish created!');
       console.log(dish);
       var id = dish._id;

       setTimeout(function(){
         Dishes.findByIdAndUpdate(id, {
           $set : {
             description : "Updated Test"
           }
         }, {
           new : true
         }).exec(function(err, dish){
           if(err) throw err;
           console.log('Updated dish!');
           console.log(dish);

           dish.comments.push({
             rating: 5,
             comment: 'I\'m getting a sinking feeling !',
             author: 'Leonardo Dicaprio'
           });

           dish.save(function(err, dish){
             console.log('Updated comments');
             console.log(dish);
           });

           db.collection('dishes').drop(function(){
             db.close();
           });
         });
       }, 3000);
  });
});
