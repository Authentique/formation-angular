'use strict';

app
    .directive('itemList', function(){
        return{
            restrict: 'E',
            templateUrl:'view/partials/itemList.html'
        };
    })