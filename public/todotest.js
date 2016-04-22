// var casper = require('casper').create();
var config = {
  url: 'http://localhost:1337/'
};

config.todo = {
  "task": "Celebrate daughter\'s birthday",
  "date": "2016-04-29"
};

casper.test.begin('Testing Angular Todo App', 7, function (test) {
  test.comment('Loading ' + config.url + '...');
  casper.start(config.url, function(response) {
    require('utils').dump(response);
    this.echo(response.headers.get('Date'));
    test.comment('Checking if title is correct');
    test.assertTitle('A is for Angular', config.url + ' has the correct title');
    test.comment('Checking if button has text "Start"');
    test.assertSelectorHasText('#goTodo', 'Start');
    this.click('#goTodo');
    test.comment('Clicking the "Start" button...');
  });

  casper.then(function() {
    test.comment('Confirm the new URL');
    test.assertUrlMatch(/\/\/localhost:1337/, 'New location is ' + this.getCurrentUrl());
  });

  casper.then(function() {
    test.comment('Checking for task input field');
    test.assertExists('#task-input');
    this.sendKeys('#task-input', config.todo.task);
    test.comment('Checking for date input field');
    test.assertExists('#date-input');
    this.sendKeys('#date-input', config.todo.date);
    test.comment('Checking for "Add" button');
    test.assertExists('#add');
    this.click('#add');
    test.comment('Clicking the "Add" button...');
  });

  casper.then(function() {
    this.waitForText(config.todo.task, function() {
      this.echo('The text is there.');
    })
  });

  casper.then(function() {
    test.comment('Checking for new task just added');
    test.assertTextExists(config.todo.task, 'page body contains ' + config.todo.task);
  });
  //
  // casper.then(function() {
  //   this.sendKeys('#task-input', config.todo.task);
  //   test.comment('Checking for "Delete" button');
  //   test.assertExists('#remove');
  //   this.click('#remove');
  //   test.comment('Clicking the "Remove" button...');
  // });
  //
  // casper.then(function() {
  //   test.comment('Checking that task is deleted');
  //   test.assertTextDoesntExist(config.todo.task, 'page body does not contain ' + config.todo.task);
  // });

  casper.run(function() {
    test.done();
  });
});
