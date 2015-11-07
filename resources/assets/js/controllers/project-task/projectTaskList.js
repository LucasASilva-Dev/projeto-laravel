/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectTaskListController', [
        '$scope', '$routeParams', 'appConfig', 'ProjectTask',
        function ($scope, $routeParams, appConfig, ProjectTask){

            $scope.projectTasks = new ProjectTask();

            $scope.save = function () {
                if($scope.form.valid){
                    $scope.projectTasks.status = appConfig.projectTask.status[0].value;
                    $scope.projectTasks.$save({id: $routeParams.id}).then (function () {
                        $scope.projectTasks = new ProjectTask();
                        $scope.loadTask();
                    })
                }
            };

            $scope.loadTask = function () {
                $scope.projectTasks = ProjectTask.query({
                    id: $routeParams.id,
                    orderBy: 'id',
                    sortedBy: 'desc'
                });
            };

            $scope.loadTask();
    }]);