var chai = require('chai');
var request = require('request');
var assert = chai.assert;

var app = require('./app.js');
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

describe('Todos can', function() {
  it('get a 200', function(done) {
    request('http://localhost:' + port + '/todos/', function(error, response) {
      assert.equal(response.statusCode, 200)
      server.close()
      done();
    });
  });
});
