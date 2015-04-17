'use strict';

app
    .service('itemRepository', ['pouchdb', '$q', '$rootScope', function(pouchdb, $q, $rootScope){
        this.save = function(item){
            var deferred = $q.defer();

            pouchdb.post(item, function(err, res){
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

            function filterItemType (item){
                if(item.type == 'item') {
                    emit(item);
                }
            }

            function reconstruireCollection(items){
                var items = items.rows.map(function(item){
                   return item.key;
                });

                return items;
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