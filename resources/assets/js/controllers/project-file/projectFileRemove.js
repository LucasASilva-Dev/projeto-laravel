/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectFileRemoveController',
    ['$scope', '$location', 'ProjectFile', '$routeParams',
        function ($scope, $location, ProjectFile, $routeParams){

            $scope.projectFile = ProjectFile.get({
                id: $routeParams.id,
                idFile: $routeParams.idFile
            });

            $scope.remove = function(){
                $scope.projectFile.$delete({
                        id:$routeParams.id,
                        idFile:  $scope.projectFile.id
                }).then(function(){
                    $location.path('/project/'+$routeParams.id+'/files');
                });
            }

    }]);