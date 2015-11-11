/**
 * Created by Lucas on 28/10/2015.
 */
angular.module('app.controllers')
    .controller('HomeController', ['$scope', '$cookies', function ($scope, $cookies){

        //$cookies.get('nomedoCookie);
        console.log($cookies.getObject('user').email);
    }]);