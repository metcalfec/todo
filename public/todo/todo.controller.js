var app = angular.module('todo');

app.controller('todoController', todo);

app.$inject = ['$http'];

function todo($http) {
  vm = this;
  activate();

  function activate() {
    getTodos();
  }

  function getTodos() {
    var todos = $http.get('http://localhost:1337/todos/');
    todos.then(function(todo) {
      vm.list = todo.data
      console.log(vm)
    })
  }

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.list.splice(position, 1);
  }

  vm.add = function(content) {
    var todo = {};
    todo.task = content;
    console.log(content)
    var added = $http.post('http://localhost:1337/todos/', todo);
    added.then(function() {
      getTodos();
    })
  }

  vm.remove = function(content) {
    var todo = {};
    todo.task = content;
    console.log(content);
    var removed = $http.delete('http://localhost:1337/todos/' + content, todo);
    // console.log(removed)
    removed.then(function() {
      getTodos();
    })
  }
}
