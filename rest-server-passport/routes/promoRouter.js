var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

var Promotions = require('../models/promotions');
var Verify = require('./verify');
var ObjectId = require('mongodb').ObjectId;

promoRouter.route('/')
.get(function(req, res, next){
   Promotions.find({}, function(err, promotions){
     if(err) throw err;
     res.json(promotions);   
   });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Promotions.create(req.body, function(err, promotion){
       if(err) throw err;
       console.log('Promotion created!');
       var id = promotion._id;
       res.writeHead(200, {'Content-Type':'text/plain'});
       res.end('Added new promotion with id: ' + id);
  }); 
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,  function(req, res, next){
   Promotions.remove({}, function(err, resp){
        if(err) throw err;
        res.json(resp);
        res.end('Deleting all promotions');
   });
});

promoRouter.route('/:id')
.get(function(req, res, next){
  Promotions.findById(req.params.id, function(err, promotion){
    if(err) throw err;
    res.json(promotion);
  });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.findByIdAndUpdate(req.params.id, {$set : req.body
  }, {new : true}, function(err, promotion){
    if(err) throw err;
    res.json(promotion);
  });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
  Promotions.remove({_id: new ObjectId(req.params.id)}, function(err, resp){
    if(err) throw err;
    res.json(resp);
  });
});

module.exports = promoRouter;
