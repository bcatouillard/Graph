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
   
        var data = weighthistory.WEIGHTLIST.map(function(e){return e.VALUE});

        data = data.reverse();

        var jour = new Array();
        var mois = new Array();
        var annee = new Array();

        for(var x=0 ; x <= labels.length-1; x++){
            jour[x] = labels[x].substring(0,2);
            mois[x] = labels[x].substring(3,5);
            annee[x] = labels[x].substring(6,10);
        }
        

        for(var x=0; x<= jour.length-1; x++){
            var sous = jour[x+1] - jour[x];
            if(sous>1 || sous<0){
                var add = parseInt(jour[x],10)+1;
                if(add<10){
                    var string = String("0"+add) + "-" + mois[x] + "-" + annee[x];
                }
                else{
                    var string = String(add) + "-" + mois[x] + "-" + annee[x];
                }
                if(add>jour[x]){
                        labels.splice(x+1,0,string);
                        data.splice(x+1,0,"NaN");
                    
                }
            }
        }





        var ctx = document.getElementById("weight").getContext('2d');

        var config = {
            type: 'line',
            data: {
               labels : labels,
               datasets: [{
                   data : data,
                   borderColor: '#FC0101',
                   fill: false,
                   lineTension: 0,
                   spanGaps: false
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
                            labelString: 'Poids',
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
            }
        }

        var myChart = new Chart(ctx, config);


        var ctx1 = document.getElementById("tension").getContext('2d');

        // var labels1 = weighthistory.BLOODPRESSURELIST.map(function(e){return e.TIME});

        // var data1 = weighthistory.BLOODPRESSURELIST.map(function(e){return e.VALUE});

        // var config1 = {
        //     type: 'line',
        //     data: {
        //        labels : labels1,
        //        datasets: [{
        //            data : data1,
        //            borderColor: '#1302FB',
        //            fill: false,
        //            lineTension: 0,
        //            spanGaps: false
        //        }]
        //     },
        //     options: {
        //         legend: {
        //             display: false
        //         },
        //         scales: {
        //             yAxes: [{
        //                 scaleLabel:{
        //                     display: true,
        //                     labelString: 'Tension',
        //                     fontsize: 50
        //                 }
        //             }],
        //             xAxes: [{
        //                 scaleLabel:{
        //                     display: true,
        //                     labelString: 'Temps',
        //                     fontsize: 50
        //                 }
        //             }]
        //         }
        //     }
        // }

        // var myChart1 = new Chart(ctx1, config1);

    });


    

    $scope.weight = false;

    $scope.tension = false;

}]);