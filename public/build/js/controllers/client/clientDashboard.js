/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('ClientDashboardController',
    ['$scope', '$location', 'Client', '$routeParams', function ($scope, $location, Client, $routeParams){

        $scope.client = {};

        $scope.clients = Client.query({
            orderBy: 'created_at',
            sortedBy: 'desc',
            limit: 8
        }, function (response) {
            $scope.clients = response.data;
        });

        $scope.showClient = function (client) {
            $scope.client = client;
        };

    }]);