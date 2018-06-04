angular.module('app').controller("IndexController", ["$scope","$http", IndexController = function ($scope,$http) {

    var label, data, weighthistory;

    $scope.cat = "";

    $scope.Categorie = [{
        id : 1,
        name : 'Poids'
    },{
        id : 2,
        name : 'Tension'
    }];

    JSONFile("weight.json", function(text){
        var data = JSON.parse(text);
        weighthistory = data.WEIGHTHISTORY;
    
        var MyChart = new FusionCharts({});
        
        $scope.GetValue = function(categorie){
            var categorieID = $scope.selectCategorie;
            var categorieName = $.grep($scope.Categorie, function(categorie){
                label = categorieName;
                $scope.cat = label;
                data = [$scope.selectCategorie]; 
                MyChart = ({
                    yAxisName: label,
                    type: 'line',
                    renderAt: 'graph',
                    width: 1500,
                    height: 250,
                    dataFormat: 'json',
                });
            })
        };
    });

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
}]);