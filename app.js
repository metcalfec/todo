var express = require('express');
var app = express();

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
    var todos = ['Learn JavaScript.', 'Learn more JavaScript.'];
    res.send(todos);
  } else {
    res.sendStatus(404);
  }
});

app.listen(1337);
