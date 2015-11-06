/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectFileNewController',
    ['$scope', '$routeParams', '$location', 'ProjectNote',
        function ($scope, $routeParams, $location, ProjectFile){
            $scope.projectNote = new ProjectFile();
            $scope.projectNote.project_id = $routeParams.id;

            $scope.save = function () {
                if($scope.form.$valid){
                    $scope.projectNote.$save({id: $routeParams.id}).then( function(){
                        $location.path('/project/'+$routeParams.id+'/notes');
                    })
                }
            }
    }]);