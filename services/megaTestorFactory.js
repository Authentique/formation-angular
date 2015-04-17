'use strict';

app
    .factory('megaTestorFactory', function(){
        var serviceName = 'megaTestorFactory !';

        function getToto(){
            return serviceName;
        }

        return{
            name: function(){
                return getToto();
            }
        }
    })
;