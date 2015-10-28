/**
 * Created by Lucas on 28/10/2015.
 */
var app = angular.module('app',['ngRoute','app.controllers']);

angular.module('app.controllers',[]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/login',{
            templateUrl: 'build/views/login.html',
            controller: 'LoginController'

        })
        .when('/home', {
            templateUrl: 'build/views/home.html',
            controller: 'HomeController'
        })

});