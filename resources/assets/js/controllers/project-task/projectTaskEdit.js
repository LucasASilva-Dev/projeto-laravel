/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectTaskEditController',
    ['$scope', '$routeParams', '$location', "$cookies",  'ProjectTask', 'appConfig',
        function ($scope, $routeParams, $location, $cookies, ProjectTask,  appConfig){

            ProjectTask.get({
                id: $routeParams.id,
                idTask: $routeParams.idTask
            }, function (data) {
                $scope.projectTask = data;
            });

            $scope.status = appConfig.projectTask.status;

            $scope.due_date = {
                status: {
                    opened: false
                }
            };

            $scope.start_date = {
                status: {
                    opened: false
                }
            };

            $scope.openDue = function ($event) {
                $scope.due_date.status.opened = true;
            };

            $scope.openStart = function ($event) {
                $scope.start_date.status.opened = true;
            };



            $scope.save = function () {
                if($scope.form.$valid){
                    ProjectTask.update({
                        id: $scope.projectTask.project_id,
                        idTask: $routeParams.idTask
                    }, $scope.projectTask, function(){
                        $location.path('/project/'+$routeParams.id+'/tasks');
                    });
                }
            };

        }]);