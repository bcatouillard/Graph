angular.module('app').controller("IndexController", ["$scope","$http", IndexController = function ($scope,$http) {

    var weighthistory;

    function JSONFile(file, callback) {
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open("GET", file, true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status == "200") {
                callback(request.responseText);
            }
        }
        request.send(null);
    }


    JSONFile("weight.json", function(text){
        var data = JSON.parse(text);
        weighthistory = data.WEIGHTHISTORY;
        document.getElementById("FULLNAME").innerHTML = weighthistory.FULLNAME;
    
    });


    

    $scope.weight = false;

    if(!$scope.weight){
    }

    $scope.tension = false;

    if(!$scope.tension){
    }

}]);