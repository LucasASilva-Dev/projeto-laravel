/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('HomeController', ['$scope', '$cookies', '$pusher', '$timeout', function ($scope, $cookies, $pusher, $timeout){

        $scope.tasks = [];
        s
        var pusher = $pusher(window.client);
        var channel = pusher.subscribe('user.'+$cookies.getObject('user').id);
        channel.bind('CodeProject\\Events\\TaskWasIncluded',
            function(data) {
                if($scope.tasks.length == 6) {
                    $scope.tasks.splice($scope.tasks.length - 1, 1);
                }
                $timeout(function () {
                    $scope.tasks.unshift(data.task);
                }, 300);
            });
    }]);