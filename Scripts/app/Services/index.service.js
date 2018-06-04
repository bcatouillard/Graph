angular.module('app').factory('IndexService', ["$http", function ($http)
{
       return{ 
            Traitement: function(){
                var callback = (function(text){});
                var request = new XMLHttpRequest();
                request.overrideMimeType("application/json");
                request.open("GET", "weight.json", true);
                request.onreadystatechange = function() {
                    if (request.readyState === 4 && request.status == "200") {
                        callback(request.responseText);
                        var data = JSON.parse(request.responseText);
                        var weighthistory = data.WEIGHTHISTORY;
                        console.log(data);
                        return weighthistory;
                    }
                }
                request.send(null);
            }
    }
    return {
        JSON : Traitement
    }  
}]);