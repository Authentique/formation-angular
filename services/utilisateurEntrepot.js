'use strict';

app
    .service('userRepository', ['pouchdb', '$q', '$rootScope', function(pouchdb, $q, $rootScope){
        this.save = function(utilisateur){
            var deferred = $q.defer();

            pouchdb.post(utilisateur, function(err, res){
                $rootScope.$apply(function(){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(res);
                    }
                });
            });

            return deferred.promise;
        };

        this.get = function(id) {
            var deferred = $q.defer();

            pouchdb
                .get(id)
                .then(deferred.resolve);

            return deferred.promise;
        };

        this.getAll = function(){
            var deferred = $q.defer();

            function filterItemType (utilisateur){
                if(utilisateur.type == 'utilisateur') {
                    emit(utilisateur);
                }
            }

            function reconstruireCollection(utilisateurs){
                var utilisateurs = utilisateurs.rows.map(function(utilisateur){
                    return utilisateur.key;
                });

                return utilisateurs;
            }

            pouchdb
                .query(filterItemType)
                .then(reconstruireCollection)
                .then(deferred.resolve);

            return deferred.promise;
        };

        this.remove = function(id){
            var deferred = $q.defer();

            pouchdb
                .get(id)
                .then(function(doc){
                    pouchdb.remove(doc._id, doc._rev);
                })
                .then(deferred.resolve);

            return deferred.promise;
        };
    }])
;