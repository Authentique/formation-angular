'use strict';

app
    .factory('pouchdb', ['dbConfig', function(dbConfig){
        PouchDB.enableAllDbs=true;

        return new PouchDB(dbConfig.DB_NAME);
    }])
;
