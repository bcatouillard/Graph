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
    

        var labels = weighthistory.WEIGHTLIST.map(function(e){return e.DATE});

        labels = labels.reverse();

        // var jour = new Array();
        // var mois = new Array();
        // var liste = new Array();
        

        // for(var y=0; y <= labels.length-1; y++){
        //     jour[y] = labels[y].substring(0,2);
        // }

        // for(var x=0 ; x <= labels.length-1; x++){
        //     mois[x] = labels[x].substring(3,5);
        // }

        // for(var x=0 ; x <= labels.length-1 ; x++){
        //     var sous = jour[x+1] - jour[x];
        //     var sous1 = mois[x+1] - mois[x];
        //     if(sous>1 ){
        //         var tempo = 1;
        //         tempo += jour[x];
        //         liste[x] = tempo;
        //     }
        //     console.log("Sous : "+sous);
        //     console.log("Sous1 :"+sous1);
        //     console.log("Liste : "+liste);   
        // }

             
       
        var data = weighthistory.WEIGHTLIST.map(function(e){return e.VALUE});

        var ctx = document.getElementById("graphique").getContext('2d');

        var config = {
            type: 'line',
            data: {
               labels : labels,
               datasets: [{
                   data : data,
                   borderColor: '#FC0101',
                   fill: false,
                   lineTension: 0
               }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: 'Poids'
                        }
                    }],
                    xAxes: [{
                        display: true,
                        labelString: 'Temps'
                    }]
                }
            }
        }

        var myChart = new Chart(ctx, config);
    });


    

    $scope.weight = false;

    $scope.tension = false;

}]);