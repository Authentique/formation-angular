'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/appelHttp', {
            templateUrl: 'view/http/recuperationMsg.html',
            controller: 'recuperationItem'
        })
}])