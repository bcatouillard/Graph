angular.module('app').factory('IndexService', ["$http", function ($http)
{
    return{ 
        Traitement: function(url){
            return $http.get(url)
        }
    }
    return {
        JSON : Traitement
    }  
}]);