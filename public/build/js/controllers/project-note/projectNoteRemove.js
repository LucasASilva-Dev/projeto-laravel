/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectNoteRemoveController',
    ['$scope', '$location', 'ProjectNote', '$routeParams',
        function ($scope, $location, ProjectNote, $routeParams){

        $scope.projectNote = ProjectNote.get({
            id: $routeParams.id,
            idNote: $routeParams.idNote
        });

        $scope.remove = function(){
            $scope.projectNote.$delete({
                id:null,
                idNote: $scope.projectNote.id
            }).then(function(){
                $location.path('/project/'+$routeParams.id+'/notes');
            });
        }
    }]);