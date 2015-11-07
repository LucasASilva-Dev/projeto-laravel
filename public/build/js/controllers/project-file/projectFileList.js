/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectFileListController', [
        '$scope', '$routeParams', 'ProjectFile', function ($scope, $routeParams, ProjectFile){
        $scope.projectFiles = ProjectFile.query({id: $routeParams.id});


    }]);