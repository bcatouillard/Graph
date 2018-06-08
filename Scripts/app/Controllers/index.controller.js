angular.module('app').controller('IndexController', ['$scope','$filter', '$routeParams', function ($scope, $filter, $routeParams) {

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
   


    $scope.GetValue = function(){ 
        $('#test').empty();
        
        if($scope.selectCategorie !== null){
            var url = $filter('filter')($scope.Categorie, function(d){return d.id == $scope.selectCategorie});
            url = url[0].url;

            var oRequest = new XMLHttpRequest();
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
        }
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
                    if(annee[x+1] - annee[x] > 0 ){
                        labels.splice(x+compt,0,string);
                        data.splice(x+compt,0,null);
                        compt++;
                    }
                    else if(mois[x+1] - mois[x] > 0){
                        labels.splice(x+compt,0,string);
                        data.splice(x+compt,0,null);
                        compt++;
                    }
                    else if(jour[x+1] - jour[x] > 0){
                        labels.splice(x+compt,0,string);
                        data.splice(x+compt,0,null);
                        compt++;
                    }
                }
            }
            if(data[x] !== null){
                 data[x] = parseInt(data[x]);
            }
        }

        var lgt = labels.length-1;

        $scope.obj = {
            type: "line",
            series: [
                { "values": data,
                  "text" : label
                }      
            ],
            crosshairX:{
                lineColor: "#565656",
                lineStyle: "dashed",
                lineWidth: 2,
                alpha : 0.5,
                plotLabel:{
                backgroundColor : "#ffffff",
                borderColor : "#d2d2d2",
                borderRadius : "5px",
                bold : true,
                fontSize : "12px",
                fontColor : "#111",
                shadow : true,
                shadowDistance : 2,
                shadowAlpha : 0.4
            },
            scaleLabel:{ 
                bold : true,
                backgroundColor : "#787878",
                borderRadius : 3,
                fontColor : "#eaeaea",
                fontSize : "12px",
                callout : true,
                paddingTop : 2
                },
                marker:{
                    visible: false 
                }
            },
            id:"chart",
            "max-items" : lgt,
            scaleX: {
                label: {
                    text: 'Temps'
                },
                values: labels
            },
            scaleY: {
                label: {
                    text: label
                }
            }
        };
        }; // END Drawcharts   
}]);