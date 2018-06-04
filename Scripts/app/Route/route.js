app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "index.html",
        controller : "Scripts/Controllers/index.controller.js"
    });

    }); 