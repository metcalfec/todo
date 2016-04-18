var app = angular.module('todo');

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