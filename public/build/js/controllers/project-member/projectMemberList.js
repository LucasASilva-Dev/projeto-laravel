/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ProjectMemberListController', [
        '$scope', '$routeParams', '$q', '$filter', 'ProjectMember', 'User',
        function ($scope, $routeParams, $q, $filter, ProjectMember, User){

            $scope.projectMember = new ProjectMember();

            $scope.save = function () {
                if($scope.form.$valid){
                    $scope.projectMember.$save({
                        id: $routeParams.id
                    }).then( function(){
                        $scope.projectMember = new ProjectMember();
                        $scope.loadMembers();
                    });
                }
            };

            $scope.loadMembers = function () {
                $scope.projectMembers = ProjectMember.query({
                    id: $routeParams.id,
                    orderBy: 'id',
                    sortedBy: 'desc'
                });
            };

            $scope.formatName = function(model) {
                if(model){
                    return model.name;
                }
                return '';
            };

            $scope.getUsers = function (name) {
                var deffered = $q.defer();
                User.query({
                    search: name,
                    searchFields: 'name:like'
                }, function (data) {
                    var result = $filter('limitTo')(data.data,10);
                    deffered.resolve(result);
                }, function(error){
                    deffered.reject(error);
                });
                return deffered.promise;

            };

            $scope.selectUser = function (item) {
                $scope.projectMember.member_id = item.id;
            };

            $scope.loadMembers();

    }]);