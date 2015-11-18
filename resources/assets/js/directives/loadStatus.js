/**
 * Created by Lucas on 18/11/2015.
 */
angular.module('app.directives')
    .directive('loadStatus',
    ['appConfig', function(appConfig){
        return {
            restrict: 'E',
            link: function (scope, element, $attrs) {
                var anchor = element;
                scope.$watch(function (event, data) {
                    for	(index = 0; index < appConfig.project.status.length; index++) {

                        if(appConfig.project.status[index].value == $attrs.idStatus){
                            var label = appConfig.project.status[index].label;
                            $(anchor).text(label);

                            if($attrs.view == 'true') {
                                switch ($attrs.idStatus) {
                                    case "1":
                                        $(anchor).parent().addClass('text-danger');
                                        break;
                                    case "2":
                                        $(anchor).parent().addClass('text-info');
                                        break;
                                    case "3":
                                        $(anchor).parent().addClass('text-success');
                                        break;
                                    default:
                                }
                            }

                        }
                    }
                });
            }
        };
    }]);