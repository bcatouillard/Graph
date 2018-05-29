angular.module('app').controller("IndexController", ["$scope", IndexController = function ($scope) {

    $scope.weight = false;

    if(!$scope.weight){
        $scope.wght = "HHHHHHH";
    }
    
    $scope.tension = false;

    if(!$scope.tension){
        $scope.tsn = "FFFFF";
    }
    
}]);