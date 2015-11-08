/**
 * Created by Lucas on 30/10/2015.
 */
angular.module('app.services')
.service('ProjectMember',['$resource', 'appConfig', function($resource, appConfig){

        return $resource(appConfig.baseUrl + '/project/:id/member/:idProjectMember',{
                id: '@id',
                idProjectMember: '@idProjectMember'
            },{
            update: {
                method: 'PUT'
            },
            get: {
                method: 'GET'
            }
        });
    }]);