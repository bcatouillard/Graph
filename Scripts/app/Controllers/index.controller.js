angular.module('app').controller('IndexController', ['$scope','IndexService', function ($scope, IndexService) {

    var weighthistory= [];

    weighthistory = IndexService.Traitement();
    
    console.log(weighthistory);

    FusionCharts.ready(function(){

        $scope.Categorie = [{
            id : "Poids",
            name : 'Poids'
        },{
            id : "Tension",
            name : 'Tension'
        }];

            // var MyChart = new FusionCharts({
            //     type: 'line',
            //     renderAt: 'graph',
            //     xAxisName: 'Temps',
            //     width: 1500,
            //     height: 250,
            //     dataFormat: 'json',
            //     dataSource: IndexService.Traitement().Poids
            // });

            var categorie = $scope.selectCategorie;

            $scope.GetValue = function(categorie){
                var categorieID = categorie;
                var categorieName = $.grep(categorieID, function(categorie){
                    label = categorieName;
                    data = weighthistory.categorieName; 
                });
                console.log(categorie);
            }
            // categorie.addEventListener("GetValue", $scope.GetValue());
        });
}]);