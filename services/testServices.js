'use strict';

app
    .service('megaTestor', function(){
        var serviceName = 'megaTestor';

        this.getName = function(){
            return serviceName;
        }
    })
;