var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongo = require('mongodb');
var myClient = mongo.MongoClient;
var url = 'mongodb://localhost/test'

app.use(jsonParser);

app.use(express.static('./public'));

app.get('/user', function(req, res) {
  var user = {
    name: 'Chris',
    location: 'Rancho Santa Margarita'
  }
  res.json(user)
});
app.get('/todos/:user', function(req, res) {
  if (req.params.user === 'Chris') {
    var todos = ['Learn JavaScript.', 'Learn NodeJS.', 'Learn AngularJS.'];
    res.send(todos);
  } else {
    res.sendStatus(404);
  }
});

app.get('/todos', function(req, res) {
  myClient.connect(url, function(error, db) {
    if (!error) {
      var todo = db.collection('todo');
      todo.find({}).toArray(function(error, results) {
        res.json(results);
        db.close();
      });
    } else {
      res.sendStatus(500);
      console.log('Could not connect to the database: ' + error);
    }
  });
});

app.post('/todos', function(req, res) {
  myClient.connect(url, function(error, db) {
    if (!error) {
      var todo = db.collection('todo');
      todo.insert({task: req.body.task}, function(error, results) {
        console.log(req.body)
        res.send(results.result);
        db.close();
      });
    } else {
      res.sendStatus(500);
      console.log('Could not connect to the database: ' + error);
    }
  });
});

app.delete('/todos/:task', function(req, res) {
  myClient.connect(url, function(error, db) {
    if (!error) {
      var theTask = {
        task: req.params.task
      };
      console.log(req.params)
      var todo = db.collection('todo');
      todo.remove(theTask, function(error, results) {
          res.send(results.result);
          db.close();
      });
    } else {
      res.sendStatus(500);
      console.log('Could not connect to the database: ' + error);
    }
  });
});

if(!require.main.loaded) {
  var server = app.listen(1337);
}

module.exports = app;
