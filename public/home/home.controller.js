var app = angular.module('todo');

app.controller('homeController', home);

app.$inject = [userService];

function home(userService) {
  var vm = this;
  vm.message = "Todays agenda for"

  var user = userService.getUser();
  user.then(function(info) {
    vm.user = info.data.name;
  })
}
