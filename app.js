'use strict';

var app = angular.module('collectify', ['ngRoute', 'ngSanitize', 'ngCookies', 'ngStorage']);
var itemCollection = [];

app.run(['$rootScope', 'websiteConfig', function($rootScope, websiteConfig){
    $rootScope.websiteConfig = websiteConfig;
}])

