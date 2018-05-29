angular.module('app').controller("IndexController", ["$scope", IndexController = function ($scope, IndexService) {

    $scope.weight = false;
       
    $(document).ready(function(){
        $.getJSON('weight.json', function(data){
            $('fullname').empty();
            $.each(data.fullname, function(entryIndex, entry){
                $scope.fullname = entry.FULLNAME;
                
                
            });
        });
    });
    

    if(!$scope.weight){
        $scope.wght = "HHHHHHH";
    }
    $scope.tension = false;

    if(!$scope.tension){
        $scope.tsn = "FFFFF";
    }
    
}]);