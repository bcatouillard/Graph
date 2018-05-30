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
    });


    

    $scope.weight = false;

    $scope.tension = false;

}]);