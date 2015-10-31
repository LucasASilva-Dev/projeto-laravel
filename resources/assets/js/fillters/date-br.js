/**
 * Created by Lucas on 30/10/2015.
 */
angular.module('app.filters').filter('dateBr',['$filter', function ($filter) {
    return function (input) {
        return $filter('date')(input, 'dd/MM/yyyy');
    }
}]);