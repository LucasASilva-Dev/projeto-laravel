/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectFileNewController',
    ['$scope', '$routeParams', 'Upload', 'appConfig', 'Url', '$location',
        function ($scope, $routeParams, Upload, appConfig, Url, $location){

            $scope.save = function () {
                if($scope.form.$valid){
                    var url = appConfig.baseUrl +
                        Url.getUrlFromUrlSymbol(appConfig.urls.projectFile, {
                            id: $routeParams.id,
                            idFile: ''
                        });
                    Upload.upload({
                        url: url,
                        fields: {
                            name: $scope.projectFile.name,
                            description: $scope.projectFile.description,
                            project_id: $routeParams.id
                        },
                        file: $scope.projectFile.file
                    }).then(function (resp) {
                        $location.path('/project/'+$routeParams.id + '/files');
                    });
                }
            }
    }]);