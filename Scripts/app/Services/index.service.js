angular.module('app').factory('IndexService', ['$http', '$q', '$location', function ($http, $q, $location) {

    return{
        Fullname: function(){
            var config = {
                params: "FULLNAME"
            }

            $http.jsonp('weight.json', config).then(function(response){
                var fullname = response;
                return fullname;
            });
        }

        ,Personne: function(){
            $http.jsonp('weight.json').then(function(response){
                return reponse;
            });
        }
    }
}]);