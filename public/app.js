var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http) {
  var vm = this;
  vm.message = "Todays agenda for"

  var user = $http.get('http://localhost:1337/user');
  user.then(function(info) {
    vm.user = info.data;
  })
}

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
    })
  }

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.list.splice(position, 1);
  }

  vm.add = function(content) {
    var todo = {};
    todo.task = content;
    var added = $http.post('http://localhost:1337/todos/', todo);
    added.then(function() {
      getTodos()
    })
  }
}
