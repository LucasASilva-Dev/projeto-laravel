/**
 * Created by Lucas on 09/11/2015.
 */
angular.module('app.controllers')
    .controller('LoginModalController',
    ['$scope', '$location', '$cookies', '$modalInstance', 'authService', 'User', 'OAuth',
        function ($scope, $location, $cookies, $modalInstance, authService, User, OAuth){
            $scope.user = {
                username: '',
                password: ''
            };

            $scope.error = {
                message: '',
                error: false
            };

            $scope.$on('event:auth-loginConfirmed', function () {
                $routeScope.loginModalOpened = false;
                $modalInstance.close();
            });

            $scope.$on('$routeChangeStart', function () {
                $routeScope.loginModalOpened = false;
                $modalInstance.dismiss('cancel');
            });

            $scope.login = function(){
                if($scope.form.$valid) {
                    OAuth.getAccessToken($scope.user).then(function () {
                        User.authenticated({},{}, function (data) {
                            $cookies.putObject('user',data);
                            authService.loginConfimed();
                        });

                    }, function (data) {
                        $scope.error.error = true;
                        $scope.error.message = data.data.error_description;
                        console.log(data.data.error_description);
                    });
                }
            };

            $scope.cancel  = function () {
                authService.loginCancelled();
                $location.path('login');
            }

        }]);