﻿angular.module('app').controller('IndexController', ['$scope','$filter', '$routeParams','$location', function ($scope, $filter, $routeParams, $location) {
    
    var valuehistory = [];
    var data;
    var label;

    var id = $routeParams.id;
    

    $scope.Categorie = [{
        id : 1,
        name : 'Poids',
        //url : "ahn_getPatientWeight"
        url : "weight.json"
    },{
        id : 2,
        name : 'Tension',
        url : 'tension.json'
    }];

   


    $scope.GetValue = function(){ 
        $('#test').empty();
        
        if($scope.selectCategorie !== null){
            var url = $filter('filter')($scope.Categorie, function(d){return d.id == $scope.selectCategorie});
            url = url[0].url;

            var oRequest = new XMLCclRequest();
            
            oRequest.onreadystatechange = function () {
                    if (oRequest.readyState == 4 ){
                        if( oRequest.status == 200) {
                            $scope.$apply(function () {
                            
                            valuehistory = JSON.parse(oRequest.responseText).VALUEHISTORY;
                            DrawCharts();
                            
                            $scope.error = false;
                            $scope.loader = false;
                        });
                        }else if(oRequest.status == 500) {
                            $scope.$apply(function () {
                            $scope.loader = false;
                            $scope.error = true;
                             });
                        } else {

                            // classic Ajax call
                            $.ajax({
                                'url': url,
                                dataType: 'json' 
                            }).done(function(data) {
                                valuehistory = data.VALUEHISTORY;
                                DrawCharts();
                                $scope.error = false;
                                $scope.loader = false;
                            });
                        
                            $scope.error = true;
                            //alert(JSON.stringify(oRequest));
                        }
                }

            };

            var param = "^MINE^,"+id;
            
            oRequest.open('GET', url);
            oRequest.send(param); 
        }
    }; // END GetValue

    function DrawCharts(){
        $('#test').append("achtung" + JSON.stringify(valuehistory));
        $scope.fullname = valuehistory.FULLNAME;
        var categorieID =  $scope.selectCategorie;
        var categorieName = $filter('filter')($scope.Categorie, function(d){return d.id == categorieID});
        label = categorieName[0].name;
        $scope.label = label;
        data = "VALUELIST";

        var labels = valuehistory[data].map(function(e){return e.DATE});
        var data = valuehistory[data].map(function(e){return e.VALUE});

        labels = labels.reverse();
        data = data.reverse();

        var jour = new Array();
        var mois = new Array();
        var annee = new Array();

        for(var x=0 ; x <= labels.length-1; x++){
            jour[x] = parseInt(labels[x].substring(0,2),10);
            mois[x] = parseInt(labels[x].substring(3,5),10);
            annee[x] = parseInt(labels[x].substring(6,10),10);
        }
        
        var compt = 1;
        
        for(var x=0; x<= labels.length-1; x++){
            var sous = jour[x+1] - jour[x];
            if(sous<0 || sous>1){
                var add = String(jour[x]+1);
                
                if(parseInt(add,10)<10){
                    if(mois[x]<10){
                        var string = "0"+add + "-" + "0"+mois[x] + "-" + annee[x];
                    }
                    else{
                        var string = "0"+add + "-" + mois[x] + "-" + annee[x];
                    }
                }
                else{
                    if(mois[x]<10){
                        var string = add + "-" + "0"+mois[x] + "-" + annee[x];
                    }
                    else{
                        var string = add + "-" + mois[x] + "-" + annee[x];
                    }
                }

                
                if(annee[x+1] - annee[x] > 0 ){
                    labels.splice(x+compt,0,string);
                    data.splice(x+compt,0,"NaN");
                    compt++;
                }
                else if(mois[x+1] - mois[x] > 0){
                    labels.splice(x+compt,0,string);
                    data.splice(x+compt,0,"NaN");
                    compt++;
                }
                else if(jour[x+1] - jour[x] > 0){
                    labels.splice(x+compt,0,string);
                    data.splice(x+compt,0,"NaN");
                    compt++;
                }
                
            }
        }

        $('#test').append("lol <br/>");

        $scope.labels = labels;
        $scope.data = [data];
        $scope.colors = ['#F7464A'];
        $scope.datasetOverride = [
            {
                fill: false,
                hoverBackgroundColor: '#F7464A',
                hoverBorderColor: '#F7464A',
                tension: 0
            }
        ];
        $scope.options =  {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    scaleLabel:{
                        display: true,
                        labelString: label,
                        fontsize: 50
                    }
                }],
                xAxes: [{
                    scaleLabel:{
                        display: true,
                        labelString: 'Temps',
                        fontsize: 50
                    }
                }]
            }
        };
        
    }  // END Drawchart    
        

   
    
}]);