var express = require('express')
var engines = require('consolidate');
var nunjucks = require('nunjucks');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.engine( 'html', nunjucks.render ) ;
app.set( 'view engine', 'html' ) ;

MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
  
  console.log("successfully connected to mongo");

  app.get("/", function(req, res){
      db.collection('movies').find({}).toArray(function(err, docs){
        res.render('movies', {'movies': docs});
      });
  });

  app.use(function(req, res){
    res.send(404, "Not Found");
  });
});

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Express server listening on port: " + port);
});
