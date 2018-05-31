angular.module('app').controller("IndexController", ["$scope", IndexController = function ($scope) {

    $scope.weight = false;

    $scope.tension = false;

    FusionCharts.ready(function() {
        var fusioncharts = new FusionCharts({
            type: 'line',
            renderAt: 'chartContainer',
            width: '1500',
            height: '250',
            dataFormat: 'jsonurl',
            dataSource: 'weight.json'
        });
        fusioncharts.render();
    });

}]);