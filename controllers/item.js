'use strict';

app

    /**
     * utilisé pour créer un nouvel exemplaire
     */
    .controller('creerItem', ['$scope', '$location', function($scope, $location) {
        $scope.exemplaire={auteur:null, titre:null, dateCreation:null}

        $scope.addItem = function(exemplaire){
            itemCollection.push(exemplaire);
            $scope.exemplaire = {};

            $location.path('items');
        }
    }])

    /**
     * utilisé pour afficher les exemplaires
     */
    .controller('listeItems', ['$scope', function($scope) {
        $scope.exemplaires=itemCollection;
    }])

    /**
     * utilisé pour alimenter des exemplaires en base
     */
    .controller('creerItemDb', ['$scope', 'itemRepository', '$location', function($scope, itemRepository, $location) {
        function validationExemplaire(){
            var valeur = true;
            $scope.nbErreur = 0;
            $scope.displayErreurAlert = false;

            if(!checkDate()){
                valeur = false;
                $scope.nbErreur ++;
            }
            if(!checkAuteur()){
                valeur = false;
                $scope.nbErreur ++;
            }
            if(!checkTitre()){
                valeur = false;
                $scope.nbErreur ++;
            }
            if(!checkTarif()){
                valeur = false;
                $scope.nbErreur ++;
            }

            if(!valeur){
                $scope.displayErreurAlert = true;
            }

            return valeur;
        }

        function checkDate(){
            if(!$scope.exemplaire.dateCreation){
                $scope.displayDateAlert = true;

                return false;
            }
            $scope.displayDateAlert = false;

            return true;
        }

        function checkAuteur(){
            if(!$scope.exemplaire.auteur){
                $scope.displayAuteurAlert = true;

                return false;
            }
            $scope.displayAuteurAlert = false;

            return true;
        }

        function checkTitre(){
            if(!$scope.exemplaire.titre){
                $scope.displayTitreAlert = true;

                return false;
            }
            $scope.displayTitreAlert = false;

            return true;
        }

        function checkTarif(){
            if(!$scope.exemplaire.tarif){
                $scope.displayTarifAlert = true;

                return false;
            }
            $scope.displayTarifAlert = false;

            return true;
        }

        function localisation(res){
            $location.path('/items');
            return res;
        }

        $scope.addItem = function(item){
            if(validationExemplaire()){
                item.type='item';

                itemRepository
                    .save(item)
                    .then(localisation)
            }
        };
    }])

    /**
     * utilisé pour afficher les exemplaires en base
     */
    .controller('listeItemsDb', ['$scope', 'itemRepository', function($scope, itemRepository) {
        itemRepository
            .getAll()
            .then(function(res){
                $scope.exemplaires = res;
            });
    }])

    /**
     * utilisé pour afficher un exemplaire à modifier
     */
    .controller('afficherItemDb', ['$scope', 'itemRepository', '$routeParams', '$location', function($scope, itemRepository, $routeParams, $location) {
        function localisation(res){
            $location.path('/items');
            return res;
        }

        $scope.buttonLabel = 'Modifier';
        var id = $routeParams.id;

        itemRepository
            .get(id)
            .then(function(res){
                $scope.exemplaire = res;
            });

        $scope.addItem = function(item){
                item.type='item';

                itemRepository
                    .save(item)
                    .then(localisation)
        }
    }])

    /**
     * utilisé pour supprimer un exemplaire à modifier
     */
    .controller('suppItemDb', ['$scope', 'itemRepository', '$routeParams', function($scope, itemRepository, $routeParams) {
        var id = $routeParams.id;

        itemRepository
            .remove(id)
            .then(function(res){
            });

        itemRepository
            .getAll()
            .then(function(res){
                $scope.exemplaires = res;
            });
    }])
;