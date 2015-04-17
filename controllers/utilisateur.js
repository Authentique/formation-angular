'use strict';

app
    /**
     * utilisé pour ajouter des utilisateurs en base
     */
    .controller('creerUserDb', ['$scope', 'userRepository', '$location', function($scope, userRepository, $location) {
        $scope.utilisateur={};

        function validationUtilisateur(){
            var valeur = true;
            $scope.nbErreur = 0;
            $scope.displayErreurAlert = false;

            if(!checkDateNaiss()){
                valeur = false;
                $scope.nbErreur ++;
            }
            if(!checkNom()){
                valeur = false;
                $scope.nbErreur ++;
            }
            if(!checkPrenom()){
                valeur = false;
                $scope.nbErreur ++;
            }

            if(!valeur){
                $scope.displayErreurAlert = true;
            }

            return valeur;
        }

        function checkDateNaiss(){
            if(!$scope.utilisateur.dateNaissance){
                $scope.displayDateNaissAlert = true;

                return false;
            }
            $scope.displayDateNaissAlert = false;

            return true;
        }

        function checkPrenom(){
            if(!$scope.utilisateur.prenom){
                $scope.displayPrenomAlert = true;

                return false;
            }
            $scope.displayPrenomAlert = false;

            return true;
        }

        function checkNom(){
            if(!$scope.utilisateur.nom){
                $scope.displayNomAlert = true;

                return false;
            }
            $scope.displayNomAlert = false;

            return true;
        }

        function localisation(res){
            $location.path('/users');
            return res;
        }

        $scope.addItem = function(utilisateur){
            if(validationUtilisateur()){
                utilisateur.type='utilisateur';

                userRepository
                    .save(utilisateur)
                    .then(localisation)
            }
        };
    }])

    .controller('listeUsersDb', ['$scope', 'userRepository', function($scope, userRepository) {
        userRepository
            .getAll()
            .then(function(res){
                $scope.utilisateurs = res;
            });
    }])

    .controller('suppUserDb', ['$scope', 'userRepository', '$routeParams', function($scope, userRepository, $routeParams) {
        var id = $routeParams.id;

        userRepository
            .remove(id)
            .then(function(res){
            });

        userRepository
            .getAll()
            .then(function(res){
                $scope.utilisateurs = res;
            });
    }])

    .controller('afficherUserDb', ['$scope', 'userRepository', '$routeParams', '$location', function($scope, userRepository, $routeParams, $location) {
        function localisation(res){
            $location.path('/users');
            return res;
        }

        $scope.buttonLabel = 'Modifier';
        var id = $routeParams.id;

        userRepository
            .get(id)
            .then(function(res){
                $scope.utilisateur = res;
            });

        $scope.addItem = function(utilisateur){
            utilisateur.type='utilisateur';

            userRepository
                .save(utilisateur)
                .then(localisation)
        }
    }])
