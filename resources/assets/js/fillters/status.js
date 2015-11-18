/**
 * Created by Lucas on 30/10/2015.
 */
angular.module('app.filters').filter('status',['$filter', function ($filter) {
    return function (input) {
        return $filter('status')(input, 'dd/MM/yyyy');
    }
}]);