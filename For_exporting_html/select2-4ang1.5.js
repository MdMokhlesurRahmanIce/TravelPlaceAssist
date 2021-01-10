angular.module('select2-demo', ['willcrisis.angular-select2'])
.controller('DemoController', function($scope) {
  $scope.selected = null;
  $scope.multipleSelected = [2];
  $scope.disabled = false;
  $scope.list = [{
    id: 1,
    name: 'John'
  }, {
    id: 2,
    name: 'Mary'
  }, {
    id: 3,
    name: 'Scott'
  }, {
    id: 4,
    name: 'Drew'
  }, {
    id: 5,
    name: 'Jackson'
  }]
});