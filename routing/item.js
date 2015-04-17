'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/items', {
            templateUrl: 'view/item/liste.html',
            controller: 'listeItemsDb'
        })
        .when('/add/item', {
            templateUrl: 'view/item/create.html',
            controller: 'creerItemDb'
        })
        .when('/majItem/:id', {
            templateUrl: 'view/item/create.html',
            controller: 'afficherItemDb'
        })
        .when('/supItem/:id', {
            templateUrl: 'view/item/liste.html',
            controller: 'suppItemDb'
        })
        .when('/users', {
            templateUrl: 'view/utilisateur/listeUser.html',
            controller: 'listeUsersDb'
        })
        .when('/add/utilisateur', {
            templateUrl: 'view/utilisateur/creerUtilisateur.html',
            controller: 'creerUserDb'
        })
        .when('/supUser/:id', {
            templateUrl: 'view/utilisateur/listeUser.html',
            controller: 'suppUserDb'
        })
        .when('/majUser/:id', {
            templateUrl: 'view/utilisateur/creerUtilisateur.html',
            controller: 'afficherUserDb'
        })
}])