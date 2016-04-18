var app = angular.module('todo');

app.directive('create', create);

function create() {
  return { templateUrl: 'todo/create.directive.html' }
}
