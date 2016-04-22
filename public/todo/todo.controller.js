var app = angular.module('todo');

app.controller('todoController', todo);

app.$inject = ['$http', userService];

function todo($http, userService) {
  vm = this;
  activate();

  function activate() {
    var user = userService.getUser();
    user.then(function(info) {
      vm.user = info.data.name;
      getTodos(vm.user);
    })
  }

  function getTodos(user) {
    var todos = $http.get('http://localhost:1337/todos/' + user);
    todos.then(function(todo) {
      vm.list = todo.data;
      // console.log(vm.list)
    })
  }

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.list.splice(position, 1);
  }

  vm.add = function(theTask, theDate, theUser) {
    var todo = {};
    todo.task = theTask;
    todo.date = theDate;
    todo.user = theUser;
    // console.log(todo);
    if (todo.task !== undefined) {
      var added = $http.post('http://localhost:1337/todos/', todo);
      added.then(function() {
        getTodos(theUser);
      })
    }
  }

  vm.remove = function(content, theUser) {
    var todo = {};
    todo.task = content;
    todo.user = theUser;
    // console.log(content);
    var removed = $http.delete('http://localhost:1337/todos/' + content, todo);
    removed.then(function() {
      getTodos(theUser);
    })
  }
}
