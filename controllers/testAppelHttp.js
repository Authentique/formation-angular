'use strict';

app

    /**
     * recupération d'un objet via un appel http + stockage d'info en cookie
     */
    .controller('recuperationItem', ['$scope', '$http', '$cookieStore', '$localStorage', 'websiteConfig', 'megaTestor', 'megaTestorFactory', 'pouchdb', function($scope, $http, $cookieStore, $localStorage, websiteConfig, megaTestor, megaTestorFactory, pouchdb){
        pouchdb.info().then(function(result){
           console.log(result);
        });

        console.log(megaTestorFactory.name());
        console.log(megaTestor.getName());
        console.log(websiteConfig);

        testLocalStorage();
        testCookieStorage();
        testAppelHttp();

        function testLocalStorage() {
            $localStorage.items = [{id: 1}];
            $localStorage.items.push({id: 2});
            console.log($localStorage);
            console.log($localStorage.items);
        }

        function testCookieStorage() {
            $cookieStore.put('MaFavoris', 'Le fondant au chocolat !');
            $scope.msgCookie = $cookieStore.get('MaFavoris');
            console.log($scope.msgCookie);
        }

        function testAppelHttp() {
            $http.get('http://demo2261101.mockable.io/').
                success(function (data) {
                    console.log(data);
                    $scope.item = data.exemplaires;
                }).
                error(function (data, status, headers) {
                    console.log(data, status, headers);
                });
        }
    }])
;