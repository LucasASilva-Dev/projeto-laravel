/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('MenuController', ['$scope', '$cookies', function ($scope, $cookies){
        $scope.user  = $cookies.getObject('user');
    }]);