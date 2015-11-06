/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectFileEditController',
    ['$scope', '$location', 'ProjectFile', '$routeParams',
        function ($scope, $location, ProjectFile, $routeParams){

        $scope.projectNote = ProjectNote.get({
            id:$routeParams.id,
            idNote: $routeParams.idNote
        });

        $scope.save = function () {
            if($scope.form.$valid){
                ProjectNote.update({id: null, idNote: $scope.projectNote.id}, $scope.projectNote, function(){
                    $location.path('/project/'+$routeParams.id+'/notes');
                });
            }
        }

    }]);