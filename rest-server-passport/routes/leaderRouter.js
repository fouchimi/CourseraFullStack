var express = require('express');
var bodyParser = require('body-parser');

var Leaderships = require('../models/leaderships');
var Verify = require('./verify');
var ObjectId = require('mongodb').ObjectId;

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(function(req, res, next){
   Leaderships.find({}, function(err, leaders){
     if(err) throw err;
     res.json(leaders);   
   });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
   Leaderships.create(req.body, function(err, leader){
       if(err) throw err;
       console.log('Leader created!');
       var id = leader._id;
       res.writeHead(200, {'Content-Type':'text/plain'});
       res.end('Added the leader with id: ' + id);
  });     
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){   
   Leaderships.remove({}, function(err, resp){
        if(err) throw err;
        res.json(resp);
        res.end('Deleting all leaderships');
   });
});

leaderRouter.route('/:id')
.get(function(req, res, next){   
  Leaderships.findById(req.params.id, function(err, leader){
    if(err) throw err;
    res.json(leader);
  });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Leaderships.findByIdAndUpdate(req.params.id, {$set : req.body
  }, {new : true}, function(err, leader){
    if(err) throw err;
    res.json(leader);
  });    
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){    
  Leaderships.remove({_id: new ObjectId(req.params.id)}, function(err, resp){
    if(err) throw err;
    res.json(resp);
  });    
});

module.exports = leaderRouter;
