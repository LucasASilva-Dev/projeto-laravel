/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('LoginController', ['$scope', function ($scope){
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function(){

        };
    }]);