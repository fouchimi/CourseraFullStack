var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){   
   Dishes.find({}, function(err, dish){
     if(err) throw err;
     res.json(dish);
   });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
     Dishes.create(req.body, function(err, dish){
          if(err) throw err;
          console.log('Dish created!');
          var id = dish._id;
          res.writeHead(200, {
              'Content-Type':'text/plain'
          });
          res.end('Added the dish with id: ' + id);
      }); 
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Dishes.remove({}, function(err, resp){
        if(err) throw err;
        res.json(resp);
        res.end('Deleted all dishes');
     }); 
});

dishRouter.route('/:dishId')
.get(function(req, res, next){
  //res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
  Dishes.findById(req.params.dishId, function(err, dish){
    if(err) throw err;
    res.json(dish);
  });
})
.put(function(req, res, next){
  //res.write('Updating the dish: ' + req.params.dishId + '\n');
  Dishes.findByIdAndUpdate(req.params.dishId, {$set : req.body
  }, {new : true}, function(err, dish){
    if(err) throw err;
    res.json(dish);
  });
})
.delete(function(req, res, next){
  res.end('Deleting dish: ' + req.params.dishId);
  Dishes.remove(req.params.dishId, function(err, resp){
    if(err) throw err;
    res.json(resp);
  });
});

dishRouter.route('/:dishId/comments')
.get(function(req, res, next){
  res.end('Will send comments about dish : ' + req.params.dishId + ' to you!');
  Dishes.findById(req.params.dishId, function(err, dish){
    if(err) throw err;
    res.json(dish.comments);
  });
})
.post(function(req, res, next){
  Dishes.findById(req.params.dishId, function(err, dish){
    if(err) throw err;
    dish.comments.push(req.body);
    dish.save(function(err, dish){
      if(err) throw err;
      console.log('Updated comment!');
      res.json(dish);
    });
  });
})
.delete(function(req, res, next){
  //res.end('Deleting dish: ' + req.params.dishId);
  Dishes.findById(req.params.dishId, function(err, dish){
    if(err) throw err;
    for(var i = (dish.comments.lenght-1); i >= 0; i--){
      dish.comments.id(dish.comments[i]._id).remove();
    }

    dish.save(function(err, result){
      if(err) throw err;
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.end('Deleted all comments');
    });
  });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function(req, res, next){
  Dishes.findById(req.params.dishId, function(err, dish){
    if(err) throw err;
    res.json(dish.comments.id(req.params.commentId));
  });
})
.put(function(req, res, next){
  //We delete the existing comment and insert a new one
  Dishes.findById(req.params.dishId, {$set : req.body
  }, {new : true}, function(err, dish){
    if(err) throw err;
    dish.comments.id(req.params.dishId).remove();
    dish.comments.push(req.body);
    dish.save(function(err, dish){
      if(err) throw err;
      console.log('Update comments!');
      console.log(dish);
      res.json(dish);
    });
  });
})
.delete(function(req, res, next){
  res.end('Deleting comment : ' + req.params.commentId);
  Dishes.findById(req.params.dishId, function(err, dish){
    if(err) throw err;
    dish.comments.id(req.params.commentId).remove();
    dish.save(function(err, resp){
      if(err) throw err;
      res.json(resp);
    });
  });
});

module.exports = dishRouter;
