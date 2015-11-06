/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectFileNewController',
    ['$scope', '$routeParams', 'Upload', '$location',
        function ($scope, $routeParams, Upload, $location){

            $scope.projectFile = {
                project_id: $routeParams.id
            };

            $scope.save = function () {
                if($scope.form.$valid){

                    Upload.upload({

                        url: 'upload/url',
                        fields: {
                            name: $scope.projectFile.name,
                            description: $scope.projectFile.description
                        },
                        file: $scope.projectFile.file

                    }).then(function (resp) {
                        $location.path('/project/'+$routeParams.id + '/files');
                    });

                }
            }
    }]);