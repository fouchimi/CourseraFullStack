var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function(req, res, next){
   res.writeHead(200, {'Content-Type': 'text/plain'});
   next();
})
.get(function(req, res, next){
   res.end('Will send all leadership to you!');
})
.post(function(req, res, next){
   res.end('Will add the leadership: ' + req.body.name + ' with details: '
   + req.body.description);
})
.delete(function(req, res, next){
   res.end('Deleting all leaderships');
});

leaderRouter.route('/:id')
.all(function(req, res, next){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  next();
})
.get(function(req, res, next){
  res.end('Will send details of the leadership: ' + req.params.id + ' to you!')
})
.put(function(req, res, next){
  res.write('Updating the leadership: ' + req.params.id + '\n');
  res.end('Will update the leadership: ' + req.body.name + ' with details ' + req.body.description);
})
.delete(function(req, res, next){
  res.end('Deleting leadership: ' + req.params.id);
});

module.exports = leaderRouter;
