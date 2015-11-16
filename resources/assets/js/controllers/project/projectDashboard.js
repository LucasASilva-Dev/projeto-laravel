/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectDashboardController',
    ['$scope', '$location', 'Project', '$routeParams', function ($scope, $location, Project, $routeParams){

        $scope.project = {};

        Project.query({
            orderBy: 'created_at',
            sortedBy: 'desc',
            limit: 5
        }, function (response) {
            $scope.projects = response.data;
        });

        $scope.showProject = function (project) {
            $scope.project = project;
        };

    }]);