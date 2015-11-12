/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.services')
.service('Client',['$resource', 'appConfig', function($resource, appConfig){

        return $resource(appConfig.baseUrl + '/client/:id',{id: '@id'},{
            update: {
                method: 'PUT'
            },
            query: {
                isArray: false
            }
        });

    }]);