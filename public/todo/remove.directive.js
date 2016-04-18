var app = angular.module('todo');

app.directive('remove', remove);

function remove() {
  return { templateUrl: 'todo/remove.directive.html' }
}
