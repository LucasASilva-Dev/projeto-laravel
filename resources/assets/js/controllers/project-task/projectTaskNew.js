/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectTaskNewController',
    ['$scope', '$routeParams', '$location', 'ProjectTask', 'appConfig',
        function ($scope, $routeParams, $location, ProjectTask, appConfig){

            $scope.projectTask = new ProjectTask();
            $scope.projectTask.project_id = $routeParams.id;

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
                    $scope.projectTask.$save({
                        id: $routeParams.id
                    }).then( function(){
                        $location.path('/project/'+$routeParams.id+'/tasks');
                    })
                }
            }
        }]);