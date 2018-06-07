app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/:id', {
            templateUrl: 'View/Home/home.html',
            controller: 'IndexController'
        })
        .when('/', {
            templateUrl: 'View/Home/home.html',
            controller: 'IndexController'
        })


}])