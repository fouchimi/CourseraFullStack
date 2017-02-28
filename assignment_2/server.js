var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./dishes');
var Promotions = require('./promotions');
var Leaderships = require('./leaderships');

//Connection url
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
   //We're Connected
   console.log('Connected successfully to server');

   Leaderships.create({
     name:"Peter Pan",
     image: "images/alberto.png",
     designation: "Chief Epicurious Officer",
     abbr: "CEO",
     description:"Our CEO, Peter, ..."
   }, function(err, leadership){
       if(err) throw err;
         console.log('New leadership created!');
         console.log(leadership);
         var id = leadership._id;

         setTimeout(function(){
           Leaderships.findByIdAndUpdate(id, {
             $set : {
               description : "Updated Leaderships"
             }
           }, {
             new : true
           }).exec(function(err, leadership){
             if(err) throw err;
                console.log('Updated leadership!');
                console.log(leadership);

             db.collection('leaderships').drop(function(){
               db.close();
             });
           });
         }, 3000);
   });

   Promotions.create({
     name:"Weekend Grand Buffet",
     image: "images/buffet.png",
     label: "New",
     price: "19.99",
     description:"Featuring ..."
   }, function(err, promotion){
       if(err) throw err;
         console.log('New promotion created!');
         console.log(promotion);
         var id = promotion._id;

         setTimeout(function(){
           Promotions.findByIdAndUpdate(id, {
             $set : {
               description : "Updated Promotion"
             }
           }, {
             new : true
           }).exec(function(err, promotion){
             if(err) throw err;
                console.log('Updated promotion!');
                console.log(promotion);

             db.collection('promotions').drop(function(){
               db.close();
             });
           });
         }, 3000);
   });

   //Create a new Dish
   Dishes.create({
     name:"Uthapizza",
     image:"images/uthapizza.png",
     category:"mains",
     label:"",
     price:"4.99",
     description:"A unique ...",
     comments:[
       {
         rating : 5,
         comment : "Imagine all the eatable, Living in conFusion",
         author: "John Lemon"
       },
       {
         rating : 4,
         comment : "Sends anyone to heaven, I wish I could get my mother-in",
         author: "Paul McVites"
       },
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
