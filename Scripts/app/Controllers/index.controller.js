angular.module('app').controller('IndexController', ['$scope','$filter', '$routeParams','$http', function ($scope, $filter, $routeParams,$http) {

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
        
        if($scope.selectCategorie !== null){
            var url = $filter('filter')($scope.Categorie, function(d){return d.id == $scope.selectCategorie});
            url = url[0].url;

            var oRequest = new XMLHttpRequest();
            // var oRequest = new XMLCclRequest();
            
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
                            $http.get(url)
                                .then(function(data) {
                                    valuehistory = data.VALUEHISTORY;
                                    DrawCharts();
                                    $scope.error = false;
                                    $scope.loader = false;
                                });    
                            $scope.error = true;
                        }
                    }
            }; 
            var param = "^MINE^,"+id;       
            oRequest.open('GET', url);
            oRequest.send(param); 
        }
    }; // END GetValue

    function DrawCharts(){
        
        $scope.fullname = valuehistory.FULLNAME;
        var categorieID =  $scope.selectCategorie;
        var categorieName = $filter('filter')($scope.Categorie, function(d){return d.id == categorieID});
        label = categorieName[0].name;
        $scope.label = categorieName[0].name.toLowerCase();
        data = "VALUELIST";

        param = 10;
        
        var encounter = valuehistory[data].map(function(e){return e.ENCOUNTERID});
        var labels = valuehistory[data].map(function(e){return e.DATE});
        var data = valuehistory[data].map(function(e){return e.VALUE});
        
        labels = labels.reverse();
        data = data.reverse();
        encounter = encounter.reverse();

        var jour = new Array();
        var mois = new Array();
        var annee = new Array();

        for(var x=0 ; x <= labels.length-1; x++){
            jour[x] = parseInt(labels[x].substring(0,2),10);
            mois[x] = parseInt(labels[x].substring(3,5),10);
            annee[x] = parseInt(labels[x].substring(6,10),10);
        }

        var compt = 1;

        for(var x=0; x<= labels.length-1; x++){ // Séparation des séjours
            if(encounter[x] == encounter[x+1]){
                var sous = jour[x+1] - jour[x];
                if(sous < param && sous > 1){
                    for(var y=1; y<sous;y++){
                        var add = String(jour[x]+y);
                        if(parseInt(add,10)<10){
                            if(mois[x]<10){
                                var string = "0"+add + "-" + "0"+mois[x] + "-" + annee[x];
                            }
                            else{
                                var string = "0"+add + "-" + mois[x] + "-" + annee[x];
                            }
                        }else{
                            if(mois[x]<10){
                                var string = add + "-" + "0"+mois[x] + "-" + annee[x];
                            }else{
                                var string = add + "-" + mois[x] + "-" + annee[x];
                            }
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
                else if(sous < 0){
                    for(var y = 1; y <= 2; y++){
                        var add = String(jour[x]+y);
                        if(parseInt(add,10)<10){
                            if(mois[x]<10){
                                var string = "0"+add + "-" + "0"+mois[x] + "-" + annee[x];
                            }
                            else{
                                var string = "0"+add + "-" + mois[x] + "-" + annee[x];
                            }
                        }else{
                            if(mois[x]<10){
                                var string = add + "-" + "0"+mois[x] + "-" + annee[x];
                            }else{
                                var string = add + "-" + mois[x] + "-" + annee[x];
                            }
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
                else if(sous > param){
                    for(var y = 1; y <= 2; y++){
                        var add = String(jour[x]+y);
                        if(parseInt(add,10)<10){
                            if(mois[x]<10){
                                var string = "0"+add + "-" + "0"+mois[x] + "-" + annee[x];
                            }
                            else{
                                var string = "0"+add + "-" + mois[x] + "-" + annee[x];
                            }
                        }else{
                            if(mois[x]<10){
                                var string = add + "-" + "0"+mois[x] + "-" + annee[x];
                            }else{
                                var string = add + "-" + mois[x] + "-" + annee[x];
                            }
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
            }
            if(data[x] !== null){
                data[x] = parseInt(data[x]);
            }
        }

        for(var x=0 ; x <= labels.length-1; x++){
            jour[x] = parseInt(labels[x].substring(0,2),10);
            mois[x] = parseInt(labels[x].substring(3,5),10);
            annee[x] = parseInt(labels[x].substring(6,10),10);
        }

        $scope.obj = { // Paramètre du graphique
            "type": "scatter",
            "series": [
                { "values": data,
                  "text" : label
                }      
            ],
            "utc" : true,
            "timezone": 2,
            "labels": [
                {
                    "id": 'zoom-out-to-start',
                    "text": 'Réinitialiser Zoom',
                    "backgroundColor":'#c3c3c3',
                    "x": '100%',
                    "y":5,
                    "offsetX": -120,
                    "padding":10,
                    "cursor": 'pointer',
                    "visible": false, 
                    "flat":false, 
                    "borderRadius": 5,
                    "hoverState": {
                      "fontColor": '#424242',
                      "border": '1px solid black'
                }
            }],
            "crosshairX":{
                "lineColor": "#565656",
                "lineStyle": "dashed",
                "lineWidth": 2,
                "alpha" : 0.5,
                "plotLabel":{
                "backgroundColor" : "#ffffff",
                "borderColor" : "#d2d2d2",
                "borderRadius" : "5px",
                "bold" : true,
                "fontSize" : "12px",
                "fontColor" : "#111",
                "shadow" : true,
                "shadowDistance" : 2,
                "shadowAlpha" : 0.4
            },
            "scaleLabel":{ 
                "bold" : true,
                "backgroundColor" : "#787878",
                "borderRadius" : 3,
                "fontColor" : "#eaeaea",
                "fontSize" : "12px",
                "callout" : true,
                "paddingTop" : 2
                },
                "marker":{
                    "visible": true 
                }
            },
            "scaleX": {
                "guide":{
                    "visible": true
                },
                "zooming": true,
                "label": {
                    "text": 'Temps',
                    "padding-top": "20px",
                    "width": "20px"
                },
                "values": labels,
                "tick":{
                    "placement": "cross",
                    "size": 12,
                },
                "item": {
                    "font-angle": -15             
                },
                "transform":{
                    "type": "date",
                    "all": "%d-%m-%Y"
                }
            },
            "scaleY": {
                "tick":{
                    "placement": "cross",
                    "size": 12
                },
                "zooming": true,
                "label": {
                    "text": label
                }
            }
        };

        zingchart.bind('chart', 'label_click', function(e) {
            if (e.labelid === 'zoom-out-to-start') {
              zingchart.exec('chart', 'viewall');
            }
          });
          zingchart.bind('chart', 'zoom', function(e) {
            if (e.action && e.action === 'viewall') {
              zingchart.exec('chart', 'updateobject', {
                type: 'label',
                data: {
                  id: 'zoom-out-to-start',
                  visible: true
                }
              });
            } else {
              zingchart.exec('chart', 'updateobject', {
                type: 'label',
                data: {
                  id: 'zoom-out-to-start',
                  visible: true
                }
              });
            }
          });

          zingchart.render({ 
            id: 'chart',
            data: $scope.obj,
            events : {
              complete : function() {
                 createGroups();
              }
            }
        });

        function createGroups(){
        
            var oPlotArea = zingchart.exec('chart', 'getobjectinfo', {
                object : 'plotarea'
            });
    
            var node = [0];
            for(var x=0;x<=data.length-1;x++){
                if(data[x] !== null && encounter[x] == encounter[x+1]){
                    node[x] = x;
                }
            }

            var tempo = [node[0],node[node.length-1]];

            var aLabels = [{
                nodes: tempo,
                data:{
                    text: encounter[0]
                }
            }];
            
            var aLabelsData = [];

            for (var l=0;l<aLabels.length;l++) { 
                var oNodeStart = zingchart.exec('chart', 'getobjectinfo', {
                    object : 'node',
                    plotindex : 0,
                    nodeindex : aLabels[l].nodes[0]
                });
                var oNodeEnd = zingchart.exec('chart', 'getobjectinfo', {
                    object : 'node',
                    plotindex : 0,
                    nodeindex : aLabels[l].nodes[1]
                });
            }

            var oLabel = aLabels.data;
            oLabel['padding'] = 5;
            oLabel['x'] = oNodeStart.x - 2;
            oLabel['y'] = oPlotArea.y - 35;
            oLabel['width'] = oNodeEnd.x + oNodeEnd.width - oNodeStart.x + 4;
            oLabel['height'] = 20;
            oLabel['font-size'] = Math.round(8 + Math.min(8, oLabel['width']/20));        
            aLabelsData.push(oLabel);
    
            var oGroup = {};
            oGroup['border-top'] = '1px solid #666';
            oGroup['border-right'] = '1px solid #666';
            oGroup['border-left'] = '1px solid #666';
            oGroup['x'] = oNodeStart.x - 2;
            oGroup['y'] = oPlotArea.y - 12;
            oGroup['width'] = oNodeEnd.x + oNodeEnd.width - oNodeStart.x + 4;
            oGroup['height'] = 8;
            aLabelsData.push(oGroup);

            zingchart.exec('chart', 'addobject', {
                type : 'label',
                data : aLabelsData
            });
        }

        
       
    }; // END Drawcharts
}]);