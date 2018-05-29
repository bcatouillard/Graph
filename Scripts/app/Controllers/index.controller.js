angular.module('app').controller("IndexController", ["$scope", IndexController = function ($scope, $http) {

    $(document).ready(function(){
        $.ajax("weight.json", {
            success: function(data){
                for(var key in data){
                    alert(data[key]);
                }
                $('fullname').html('<li id="fullname">""+data.fullname+""</li>');
                alert(data);
            }
        });
    });

    $(function(){

        

        $scope.weight = false;

        if(!$scope.weight){
        }

        $scope.tension = false;

        if(!$scope.tension){
        }

    });
}]);