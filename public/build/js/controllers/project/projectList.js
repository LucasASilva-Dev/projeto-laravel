/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectListController', [
        '$scope', '$routeParams', 'Project', function ($scope, $routeParams, Project){

            $scope.projects = [];

            $scope.totalProjects = 0;
            $scope.projectsPerPage = 4;

            $scope.pagination = {
                current: 1
            };

            $scope.pageChanged = function(newPage) {
                getResultsPage(newPage);
            };


            function getResultsPage(pageNumber) {
                 Project.query({
                     page: pageNumber,
                     limit: $scope.projectsPerPage
                 }, function (data) {
                     $scope.projects = data.data;
                     $scope.totalProjects = data.meta.pagination.total;

                 });

            }

            getResultsPage(1);
    }]);


