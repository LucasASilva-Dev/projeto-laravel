/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectNoteListController', [
        '$scope', '$routeParams', 'ProjectNote', function ($scope, $routeParams, ProjectNote){
        $scope.projectNotes = ProjectNote.query({id: $routeParams.id});


    }]);