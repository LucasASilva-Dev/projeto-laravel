/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectRemoveController',
    ['$scope', '$location', 'Project', '$routeParams',
        function ($scope, $location, Project, $routeParams){

        $scope.project = Project.get({id: $routeParams.id});

        $scope.remove = function(){
            $scope.project.$delete({id: $scope.project.id}).then(function(){
                $location.path('/projects/');
            });
        }
    }]);