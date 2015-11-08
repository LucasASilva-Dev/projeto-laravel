/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectMemberRemoveController',
    ['$scope', '$location', 'Project', '$routeParams',
        function ($scope, $location, ProjectMember, $routeParams){

        $scope.projectMember = ProjectMember.get({
            id: $routeParams.id,
            idProjectMember: $routeParams.idProjectMember
        });

        $scope.remove = function(){
            $scope.projectMember.$delete({
                id: $routeParams.id,
                idProjectMember: $routeParams.idProjectMember
            }).then(function(){
                $location.path('/project/' + $routeParams.id + '/members');
            });
        }
    }]);